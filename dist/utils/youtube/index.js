"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONVERT_YTB_DURATION_TO_SECONDS = void 0;
const CONVERT_YTB_DURATION_TO_SECONDS = (duration) => {
    const time_extractor = /([0-9]*H)?([0-9]*M)?([0-9]*S)?$/;
    const extracted = time_extractor.exec(duration);
    const hours = parseInt(extracted[1], 10) || 0;
    const minutes = parseInt(extracted[2], 10) || 0;
    const seconds = parseInt(extracted[3], 10) || 0;
    return hours * 3600 * 1000 + minutes * 60 * 1000 + seconds * 1000;
};
exports.CONVERT_YTB_DURATION_TO_SECONDS = CONVERT_YTB_DURATION_TO_SECONDS;
//# sourceMappingURL=index.js.map