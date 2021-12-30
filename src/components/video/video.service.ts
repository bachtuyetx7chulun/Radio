import { Injectable } from '@nestjs/common'
import { PrismaService } from 'services/prisma/prisma.service'
import { YoutubeService } from 'services/youtube/youtube.service'
import { isEmpty } from 'lodash'

@Injectable()
export class VideoService {
  constructor(private prisma: PrismaService, private youtube: YoutubeService) {}

  // * Get vidoes by list video ids
  public async getTopVideos(): Promise<any> {
    // TODO: Find video via vote
    const videos = await this.prisma.video.findMany({
      where: {
        isPlaying: false,
        votes: {
          not: 0,
        },
      },
      orderBy: {
        votes: 'desc',
      },
    })

    if (isEmpty(videos)) return []
    const videoIds = videos.map((video) => video.videoId)
    return await this.getVideosByIds(videoIds)
  }

  // * Get videos through videos ids
  public async getVideosByIds(videoIds: string[]): Promise<any> {
    const { data } = await this.youtube.videos.list({
      part: ['snippet', 'contentDetails', 'statistics'],
      id: [...videoIds],
    })

    return data?.items
  }

  // * Search video by name
  public async search(query: string): Promise<any> {
    const { data } = await this.youtube.search.list({ q: query, maxResults: 25, part: ['id', 'snippet'] })
    const list = data.items.map((item) => {
      return item?.id?.videoId
    })
    return await this.getVideosByIds(list)
  }

  // * Get channel by id
  public async getChannel(channelId: string): Promise<any> {
    const { data } = await this.youtube.channels.list({
      id: [channelId],
      part: ['snippet'],
    })

    return data?.items[0]
  }
}
