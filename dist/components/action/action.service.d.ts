import { PrismaService } from 'services/prisma/prisma.service';
export declare class ActionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    postSugguest(ipPublic: string, videoIds: string[]): Promise<import(".prisma/client").Action | {
        isSend: boolean;
        id: number;
        name: string;
        content: string;
        ipPublic: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    handleSuggest(): Promise<{
        videoId: string;
        votes: number;
    }[]>;
}
