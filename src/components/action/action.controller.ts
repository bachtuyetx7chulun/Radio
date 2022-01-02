import { Body, Controller, Get, Headers, Post } from '@nestjs/common'
import { ApiBody, ApiHeaders } from '@nestjs/swagger'
import { ActionEntity } from './action.entity'
import { ActionService } from './action.service'
import { PostVideosIds } from './dto/action.request'

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post('send-suggest')
  @ApiHeaders([
    {
      name: 'ip',
      description: 'IP public of user',
      required: true,
      example: '118.70.12.190',
    },
  ])
  @ApiBody({
    type: PostVideosIds,
    description: 'List video id to suguest',
  })
  async postSugguest(@Headers() headers: { ip: string }, @Body() body: PostVideosIds): Promise<ActionEntity> {
    return this.actionService.postSugguest(headers.ip, body.video_ids)
  }

  @Get('handle-suggest')
  async handleSugguest(): Promise<any> {
    return this.actionService.handleSuggest()
  }
}
