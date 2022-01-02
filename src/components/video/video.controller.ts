import { Controller, Get, Query } from '@nestjs/common'
import { ApiParam, ApiQuery } from '@nestjs/swagger'
import { VideoService } from './video.service'

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}
  // * Get videos by list video ids
  @Get('get-playlist')
  async getVideosByIds(): Promise<any> {
    return await this.videoService.getPlayList()
  }

  // * Search video by name
  @Get('search-videos')
  @ApiQuery({
    name: 'q',
    description: 'Search query',
    schema: {
      properties: {
        q: { type: 'string' },
      },
    },
  })
  async search(@Query() query: { q: string }): Promise<any> {
    return this.videoService.search(query.q)
  }

  // * Get channel by id
  @Get('search-channel')
  @ApiParam({
    type: 'string',
    name: 'channelId',
  })
  async getChannel(@Query() query: { channelId: string }): Promise<any> {
    return this.videoService.getChannel(query.channelId)
  }
}
