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
exports.ActionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma/prisma.service");
const lodash_1 = require("lodash");
const moment = require("moment");
const index_1 = require("../../constants/index");
const _ = require("lodash");
const video_service_1 = require("../video/video.service");
let ActionService = class ActionService {
    constructor(prisma, videoService) {
        this.prisma = prisma;
        this.videoService = videoService;
    }
    async postSugguest(ipPublic, videoIds) {
        if ((0, lodash_1.isEmpty)(ipPublic))
            throw new common_1.BadRequestException('ipPublic is required');
        console.log(ipPublic);
        const action = await this.prisma.action.findFirst({
            where: {
                ipPublic,
                createdAt: {
                    lte: new Date(moment().add(1, 'hour').format(index_1.MOMENT.HOUR_FORMAT)),
                    gt: new Date(moment().format(index_1.MOMENT.HOUR_FORMAT)),
                },
            },
        });
        if (!(0, lodash_1.isEmpty)(action))
            return Object.assign(Object.assign({}, action), { isSend: true });
        return await this.prisma.action.create({
            data: {
                name: 'POST_SUGGEST',
                content: JSON.stringify(videoIds),
                ipPublic,
            },
        });
    }
    async handleSuggest() {
        const actions = await this.prisma.action.findMany({
            where: {
                createdAt: {
                    lte: new Date(moment().add(1, 'hour').format(index_1.MOMENT.HOUR_FORMAT)),
                    gt: new Date(moment().format(index_1.MOMENT.HOUR_FORMAT)),
                },
                isActived: false,
            },
        });
        if (_.isEmpty(actions))
            return [];
        const videoIds = actions.map((action) => JSON.parse(action.content)).flat(2);
        const groupVideoIds = _.groupBy(videoIds);
        const videos = Object.keys(groupVideoIds).map((key) => {
            return {
                videoId: key,
                votes: groupVideoIds[key].length,
            };
        });
        const sortVideoIds = _.orderBy(videos, ['votes'], ['desc']).slice(0, 10);
        await this.prisma.video.createMany({
            data: sortVideoIds,
        });
        await this.prisma.action.updateMany({
            data: {
                isActived: true,
            },
            where: {
                createdAt: {
                    lte: new Date(moment().add(1, 'hour').format(index_1.MOMENT.HOUR_FORMAT)),
                    gt: new Date(moment().format(index_1.MOMENT.HOUR_FORMAT)),
                },
            },
        });
        return sortVideoIds;
    }
    async getCurrentVideo() {
        var _a, _b, _c, _d;
        const currentVideo = await this.prisma.play.findFirst({
            orderBy: {
                createdAt: 'desc',
            },
        });
        if (_.isEmpty(currentVideo)) {
            const video = await this.prisma.video.findFirst({
                where: {
                    isPlayed: false,
                },
            });
            if (_.isEmpty(video))
                throw new common_1.BadRequestException('Videos is not exist');
            const newPlayVideo = await this.prisma.play.create({
                data: {
                    videoId: video.videoId,
                },
            });
            const detailVideo = await this.videoService.getVideosByIds([video.videoId]);
            return Object.assign(Object.assign({}, newPlayVideo), { duration: (_b = (_a = detailVideo[0]) === null || _a === void 0 ? void 0 : _a.contentDetails) === null || _b === void 0 ? void 0 : _b.duration });
        }
        const detailVideo = await this.videoService.getVideosByIds([currentVideo.videoId]);
        return Object.assign(Object.assign({}, currentVideo), { duration: (_d = (_c = detailVideo[0]) === null || _c === void 0 ? void 0 : _c.contentDetails) === null || _d === void 0 ? void 0 : _d.duration });
    }
    async setCurrentVideo(videoId) {
        const latestVideo = await this.prisma.play.findFirst({
            orderBy: {
                createdAt: 'desc',
            },
        });
        if (latestVideo && latestVideo.videoId === videoId)
            return latestVideo;
        const playList = await this.prisma.video.findMany({
            where: {
                isPlayed: false,
            },
        });
        const videoIds = playList.map((video) => video.videoId);
        if (!_.includes(videoIds, videoId))
            throw new common_1.BadRequestException('Video is not exist');
        await this.prisma.video.updateMany({
            data: {
                isPlayed: true,
            },
            where: {
                videoId: latestVideo.videoId,
            },
        });
        const newPlayVideo = await this.prisma.play.create({
            data: {
                videoId,
            },
        });
        return newPlayVideo;
    }
    async getTrending() {
        return await this.videoService.getTrending();
    }
    async getRandomVideos() {
        const playList = await this.prisma.video.findMany({
            where: {
                isPlayed: false,
            },
        });
        if (playList.length > 1)
            return playList;
        const videos = await this.videoService.getTrending(35);
        const randomVideos = _.sampleSize(videos, 5);
        const randomVideoIds = randomVideos.map((video) => {
            return {
                videoId: video === null || video === void 0 ? void 0 : video.id,
                votes: 1,
            };
        });
        await this.prisma.video.createMany({
            data: randomVideoIds,
        });
        return randomVideos;
    }
};
ActionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, video_service_1.VideoService])
], ActionService);
exports.ActionService = ActionService;
//# sourceMappingURL=action.service.js.map