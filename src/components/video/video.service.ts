import { Injectable } from '@nestjs/common'
import { PrismaService } from 'services/prisma/prisma.service'
import { YoutubeService } from 'services/youtube/youtube.service'
import { isEmpty } from 'lodash'

@Injectable()
export class VideoService {
  constructor(private prisma: PrismaService, private youtube: YoutubeService) {}

  // * Get vidoes by list video ids
  public async getPlayList(): Promise<any> {
    // TODO: Find video via vote
    const videos = await this.prisma.video.findMany({
      where: {
        isPlayed: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (isEmpty(videos)) return []
    const videoIds = videos.map((video) => video.videoId)
    const playList = await this.getVideosByIds(videoIds)
    return {
      total: playList.length,
      videos: playList,
    }
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

  // * Get top trending videos
  public async getTrending(maxResults?: number): Promise<any> {
    const { data } = await this.youtube.videos.list({
      chart: 'mostPopular',
      videoCategoryId: '10',
      part: ['snippet', 'contentDetails', 'statistics'],
      maxResults: maxResults || 10,
    })

    return data?.items
  }
}
