import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class ActionService {
  public async search(query: string): Promise<any> {
    const searchUrl = `${process.env.YOUTUBE_API}/search?part=snippet&maxResults=25&q=${query}&key=${process.env.YOUTUBE_API_KEY}`
    const { data } = await axios.get(searchUrl)
    return data
  }
}
