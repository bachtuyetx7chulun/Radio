import { Request } from 'express';
import { ActionEntity } from './action.entity';
import { ActionService } from './action.service';
import { PostVideosIds } from './dto/action.request';
export declare class ActionController {
    private readonly actionService;
    constructor(actionService: ActionService);
    postSugguest(req: Request, body: PostVideosIds): Promise<ActionEntity>;
    handleSugguest(): Promise<any>;
    getCurrentVideo(): Promise<any>;
    postCurrentVideo(body: {
        video_id: string;
    }): Promise<any>;
}
