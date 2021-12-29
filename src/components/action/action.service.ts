import { Injectable } from '@nestjs/common'
import { google } from 'googleapis'

@Injectable()
export class ActionService {
  // * Search for a video
  public async search(query: string): Promise<any> {
    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY,
    })

    const { data } = await youtube.search.list({ q: query, maxResults: 25, part: ['id', 'snippet'] })
    const list = data.items.map((item) => {
      return item?.id?.videoId
    })

    const { data: ListVideo } = await youtube.videos.list({
      part: ['snippet', 'contentDetails', 'statistics'],
      id: [...list],
    })

    return ListVideo?.items
  }

  // * Get channel by id
  public async getChannel(channelId: string): Promise<any> {
    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY,
    })

    const { data } = await youtube.channels.list({
      id: [channelId],
      part: ['snippet'],
    })

    return data?.items[0]
  }

  // * Post guess list video form client
  public async postSugguest(videoIds: string[]) {
    return videoIds
  }
}
