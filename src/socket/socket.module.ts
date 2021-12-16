import { Module } from '@nestjs/common'
import { EventsGateway } from 'socket/socket.gateway'

@Module({
  providers: [EventsGateway],
})
export class EventsModule {}
