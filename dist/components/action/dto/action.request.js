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
exports.PostVideosId = exports.PostVideosIds = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PostVideosIds {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_-]{11}$/, { each: true, message: 'Id is not valid' }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, swagger_1.ApiProperty)({
        type: [String],
        example: ['yH88qRmgkGI', 'Il0S8BoucSA', 'orJSJGHjBLI'],
    }),
    __metadata("design:type", Array)
], PostVideosIds.prototype, "video_ids", void 0);
exports.PostVideosIds = PostVideosIds;
class PostVideosId {
}
__decorate([
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_-]{11}$/, { each: true, message: 'Id is not valid' }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'yH88qRmgkGI',
    }),
    __metadata("design:type", String)
], PostVideosId.prototype, "video_id", void 0);
exports.PostVideosId = PostVideosId;
//# sourceMappingURL=action.request.js.map