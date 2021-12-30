import { Body, Controller, Get, Header, Ip, Post, Req } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'
import { ActionService } from './action.service'
import { PostVideosIds } from './dto/action.request'

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post('send-sugguest')
  @ApiBody({
    type: PostVideosIds,
    description: 'List video id to suguest',
  })
  async postSugguest(@Ip() ip: string, @Body() body: PostVideosIds): Promise<any> {
    return this.actionService.postSugguest(ip, body.video_ids)
  }

  @Get('get-ip')
  async getIp(@Ip() ip: string): Promise<any> {
    return this.actionService.getIp(ip)
  }
}
