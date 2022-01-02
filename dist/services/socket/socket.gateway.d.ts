import { WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Server } from 'socket.io';
export declare class EventsGateway {
    private logger;
    server: Server;
    afterInit(): void;
    handleConnection(): Promise<void>;
    handleDisconnect(): Promise<void>;
    findAll(data: any): Observable<WsResponse<number>>;
    clients(): Promise<WsResponse<any>>;
}
