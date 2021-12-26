import { Injectable } from '@nestjs/common'
import dropRate from 'drop-rate'

@Injectable()
export class AppService {
  getHello(): string {
    const result = dropRate.calculate([
      { name: 'SR', rate: 50 },
      { name: 'SSR', rate: 30 },
      { name: 'UR', rate: 20 },
    ])
    return JSON.stringify(result)
  }
}
