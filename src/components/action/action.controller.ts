import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiBody, ApiParam } from '@nestjs/swagger'
import { ActionService } from './action.service'
import { PostVideoIds } from './dto/action.request'

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}
  @Get('search-videos')
  @ApiParam({ name: 'q', description: 'Search query' })
  async search(@Query() query: { q: string }): Promise<any> {
    return this.actionService.search(query.q)
  }

  @Get('search-channel')
  @ApiParam({
    type: 'string',
    name: 'channelId',
  })
  async getChannel(@Query() query: { channelId: string }): Promise<any> {
    return this.actionService.getChannel(query.channelId)
  }

  @Post('send-sugguest')
  @ApiBody({
    type: PostVideoIds,
    description: 'List video id to suguest',
  })
  async postSugguest(@Body() body: PostVideoIds): Promise<any> {
    return this.actionService.postSugguest(body.video_ids)
  }
}
