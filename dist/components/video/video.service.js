"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma/prisma.service");
const youtube_service_1 = require("../../services/youtube/youtube.service");
const lodash_1 = require("lodash");
let VideoService = class VideoService {
    constructor(prisma, youtube) {
        this.prisma = prisma;
        this.youtube = youtube;
    }
    async getPlayList() {
        const videos = await this.prisma.video.findMany({
            where: {
                isPlayed: false,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        if ((0, lodash_1.isEmpty)(videos))
            return [];
        const videoIds = videos.map((video) => video.videoId);
        const playList = await this.getVideosByIds(videoIds);
        return {
            total: playList.length,
            videos: playList,
        };
    }
    async getVideosByIds(videoIds) {
        const { data } = await this.youtube.videos.list({
            part: ['snippet', 'contentDetails', 'statistics'],
            id: [...videoIds],
        });
        return data === null || data === void 0 ? void 0 : data.items;
    }
    async search(query) {
        const { data } = await this.youtube.search.list({ q: query, maxResults: 25, part: ['id', 'snippet'] });
        const list = data.items.map((item) => {
            var _a;
            return (_a = item === null || item === void 0 ? void 0 : item.id) === null || _a === void 0 ? void 0 : _a.videoId;
        });
        return await this.getVideosByIds(list);
    }
    async getChannel(channelId) {
        const { data } = await this.youtube.channels.list({
            id: [channelId],
            part: ['snippet'],
        });
        return data === null || data === void 0 ? void 0 : data.items[0];
    }
    async getTrending(maxResults) {
        const { data } = await this.youtube.videos.list({
            chart: 'mostPopular',
            videoCategoryId: '10',
            part: ['snippet', 'contentDetails', 'statistics'],
            maxResults: maxResults || 10,
        });
        return data === null || data === void 0 ? void 0 : data.items;
    }
};
VideoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, youtube_service_1.YoutubeService])
], VideoService);
exports.VideoService = VideoService;
//# sourceMappingURL=video.service.js.map