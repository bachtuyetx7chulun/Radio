import { ActionEntity } from './action.entity';
import { ActionService } from './action.service';
import { PostVideosIds } from './dto/action.request';
export declare class ActionController {
    private readonly actionService;
    constructor(actionService: ActionService);
    postSugguest(headers: {
        ip: string;
    }, body: PostVideosIds): Promise<ActionEntity>;
    handleSugguest(): Promise<any>;
}
