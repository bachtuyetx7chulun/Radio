import { Module } from '@nestjs/common'
import { EventsGateway } from 'services/socket/socket.gateway'

@Module({
  providers: [EventsGateway],
})
export class EventsModule {}
