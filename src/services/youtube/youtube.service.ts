import { Injectable } from '@nestjs/common'
import { youtube_v3 } from 'googleapis'

@Injectable()
export class YoutubeService extends youtube_v3.Youtube {
  constructor() {
    super({
      auth: process.env.YOUTUBE_API_KEY,
    })
  }
}
