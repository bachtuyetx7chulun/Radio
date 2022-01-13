import { PrismaService } from 'services/prisma/prisma.service';
import { YoutubeService } from 'services/youtube/youtube.service';
export declare class VideoService {
    private prisma;
    private youtube;
    constructor(prisma: PrismaService, youtube: YoutubeService);
    getPlayList(): Promise<any>;
    getVideosByIds(videoIds: string[]): Promise<any>;
    search(query: string): Promise<any>;
    getChannel(channelId: string): Promise<any>;
    getTrending(maxResults?: number): Promise<any>;
}
