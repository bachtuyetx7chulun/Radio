import { Injectable } from '@nestjs/common'
import { PrismaService } from 'services/prisma/prisma.service'
import { isEmpty } from 'lodash'

@Injectable()
export class ActionService {
  constructor(private readonly prisma: PrismaService) {}

  // * Post guess list video form client
  public async postSugguest(ipPublic: string, videoIds: string[]) {
    const ip = ipPublic.split(':')[3]
    const user = await this.prisma.action.findFirst({
      where: { ipPublic: ip },
    })

    if (isEmpty(user)) {
      return []
    }

    return await this.prisma.action.create({
      data: {
        name: 'POST_SUGGEST',
        content: JSON.stringify(videoIds),
        ipPublic,
      },
    })
  }

  public async getIp(ipPublic: string) {
    return ipPublic
  }
}
