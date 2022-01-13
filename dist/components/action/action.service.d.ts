import { PrismaService } from 'services/prisma/prisma.service';
import { VideoService } from 'components/video/video.service';
export declare class ActionService {
    private readonly prisma;
    private readonly videoService;
    constructor(prisma: PrismaService, videoService: VideoService);
    postSugguest(ipPublic: string, videoIds: string[]): Promise<import(".prisma/client").Action | {
        isSend: boolean;
        id: number;
        name: string;
        content: string;
        ipPublic: string;
        isActived: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    handleSuggest(): Promise<{
        videoId: string;
        votes: number;
    }[]>;
    getCurrentVideo(): Promise<{
        duration: any;
        id: number;
        videoId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    setCurrentVideo(videoId: string): Promise<import(".prisma/client").Play>;
    getTrending(): Promise<any>;
    getRandomVideos(): Promise<any[]>;
}
