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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../utils");
const action_service_1 = require("./action.service");
const action_request_1 = require("./dto/action.request");
let ActionController = class ActionController {
    constructor(actionService) {
        this.actionService = actionService;
    }
    async postSugguest(req, body) {
        const ip = (0, utils_1.getIp)(req);
        return this.actionService.postSugguest(`${ip}`, body.video_ids);
    }
    async handleSugguest() {
        return this.actionService.handleSuggest();
    }
    async getCurrentVideo() {
        return await this.actionService.getCurrentVideo();
    }
    async postCurrentVideo(body) {
        return await this.actionService.setCurrentVideo(body.video_id);
    }
};
__decorate([
    (0, common_1.Post)('send-suggest'),
    (0, swagger_1.ApiBody)({
        type: action_request_1.PostVideosIds,
        description: 'List video id to suguest',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, action_request_1.PostVideosIds]),
    __metadata("design:returntype", Promise)
], ActionController.prototype, "postSugguest", null);
__decorate([
    (0, common_1.Get)('handle-suggest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ActionController.prototype, "handleSugguest", null);
__decorate([
    (0, common_1.Get)('current-video'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ActionController.prototype, "getCurrentVideo", null);
__decorate([
    (0, common_1.Post)('current-video'),
    (0, swagger_1.ApiBody)({
        type: action_request_1.PostVideosId,
        description: 'Video id to set current video',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ActionController.prototype, "postCurrentVideo", null);
ActionController = __decorate([
    (0, common_1.Controller)('action'),
    __metadata("design:paramtypes", [action_service_1.ActionService])
], ActionController);
exports.ActionController = ActionController;
//# sourceMappingURL=action.controller.js.map