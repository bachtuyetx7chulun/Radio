import { Controller, Get, Query } from '@nestjs/common'
import { ApiParam } from '@nestjs/swagger'
import { ActionService } from './action.service'

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
}
