import { Module } from '@nestjs/common'
import { VideoModule } from 'components/video/video.module'
import { ActionController } from './action.controller'
import { ActionService } from './action.service'

@Module({
  imports: [VideoModule],
  controllers: [ActionController],
  providers: [ActionService],
})
export class ActionModule {}
