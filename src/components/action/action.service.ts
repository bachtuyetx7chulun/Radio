import { Injectable } from '@nestjs/common'
import { google } from 'googleapis'

@Injectable()
export class ActionService {
  public async search(query: string): Promise<any> {
    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY,
    })

    const { data } = await youtube.search.list({ q: query, maxResults: 25 }, { params: { part: 'snippet' } })
    return data
  }
}
