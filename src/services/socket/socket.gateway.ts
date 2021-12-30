import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Server } from 'socket.io'
import { Logger } from '@nestjs/common'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'booking',
})
export class EventsGateway {
  private logger: Logger = new Logger('AppGateWay')
  @WebSocketServer()
  server: Server

  afterInit() {
    this.logger.log('Initialized')
  }

  async handleConnection() {
    const data = (await this.server.allSockets()).size
    this.server.emit('clients', data)
  }
  async handleDisconnect() {
    const data = (await this.server.allSockets()).size
    this.server.emit('clients', data)
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map((item) => ({ event: 'events', data: item })))
  }

  @SubscribeMessage('clients')
  async clients(): Promise<WsResponse<any>> {
    const data = (await this.server.allSockets()).size
    return { event: 'clients', data }
  }
}
