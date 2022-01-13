import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'
import { Request } from 'express'
import { getIp } from 'utils'
import { ActionEntity } from './action.entity'
import { ActionService } from './action.service'
import { PostVideosId, PostVideosIds } from './dto/action.request'

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post('send-suggest')
  @ApiBody({
    type: PostVideosIds,
    description: 'List video id to suguest',
  })
  async postSugguest(@Req() req: Request, @Body() body: PostVideosIds): Promise<ActionEntity> {
    const ip = getIp(req)
    return this.actionService.postSugguest(`${ip}`, body.video_ids)
  }

  @Get('handle-suggest')
  async handleSugguest(): Promise<any> {
    return this.actionService.handleSuggest()
  }

  @Get('current-video')
  async getCurrentVideo(): Promise<any> {
    return await this.actionService.getCurrentVideo()
  }

  @Post('current-video')
  @ApiBody({
    type: PostVideosId,
    description: 'Video id to set current video',
  })
  async postCurrentVideo(@Body() body: { video_id: string }): Promise<any> {
    return await this.actionService.setCurrentVideo(body.video_id)
  }

  @Get('trending-videos')
  async getTrendingVideos(): Promise<any> {
    return await this.actionService.getTrending()
  }

  @Get('generate-videos')
  async generateVideos(): Promise<any> {
    return await this.actionService.getRandomVideos()
  }
}
