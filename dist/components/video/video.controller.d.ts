import { VideoService } from './video.service';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    getVideosByIds(): Promise<any>;
    search(query: {
        q: string;
    }): Promise<any>;
    getChannel(query: {
        channelId: string;
    }): Promise<any>;
}
