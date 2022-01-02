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
let ActionService = class ActionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async postSugguest(ipPublic, videoIds) {
        if ((0, lodash_1.isEmpty)(ipPublic))
            throw new common_1.BadRequestException('ipPublic is required');
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
                isActive: true,
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
        const sortVideoIds = _.orderBy(videos, ['votes'], ['desc']).slice(0, 5);
        await this.prisma.video.createMany({
            data: sortVideoIds,
        });
        await this.prisma.action.updateMany({
            data: {
                isActive: false,
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
};
ActionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ActionService);
exports.ActionService = ActionService;
//# sourceMappingURL=action.service.js.map