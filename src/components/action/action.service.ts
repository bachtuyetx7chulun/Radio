import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'services/prisma/prisma.service'
import { isEmpty } from 'lodash'
import * as moment from 'moment'
import { MOMENT } from 'constants/index'
import * as _ from 'lodash'

@Injectable()
export class ActionService {
  constructor(private readonly prisma: PrismaService) {}

  // * Post guess list video form client
  public async postSugguest(ipPublic: string, videoIds: string[]) {
    // * Check ip public
    if (isEmpty(ipPublic)) throw new BadRequestException('ipPublic is required')

    // * Check is post video
    const action = await this.prisma.action.findFirst({
      where: {
        ipPublic,
        createdAt: {
          lte: new Date(moment().add(1, 'hour').format(MOMENT.HOUR_FORMAT)),
          gt: new Date(moment().format(MOMENT.HOUR_FORMAT)),
        },
      },
    })

    // * Check user sent post
    if (!isEmpty(action))
      return {
        ...action,
        isSend: true,
      }

    // * Create post action
    return await this.prisma.action.create({
      data: {
        name: 'POST_SUGGEST',
        content: JSON.stringify(videoIds),
        ipPublic,
      },
    })
  }

  // * Handle post suggest
  public async handleSuggest() {
    // * Get list action
    const actions = await this.prisma.action.findMany({
      where: {
        createdAt: {
          lte: new Date(moment().add(1, 'hour').format(MOMENT.HOUR_FORMAT)),
          gt: new Date(moment().format(MOMENT.HOUR_FORMAT)),
        },
        isActive: true,
      },
    })
    // * Check list action
    if (_.isEmpty(actions)) return []

    const videoIds = actions.map((action) => JSON.parse(action.content)).flat(2)
    const groupVideoIds = _.groupBy(videoIds)
    const videos = Object.keys(groupVideoIds).map((key) => {
      return {
        videoId: key,
        votes: groupVideoIds[key].length,
      }
    })

    const sortVideoIds = _.orderBy(videos, ['votes'], ['desc']).slice(0, 5)
    await this.prisma.video.createMany({
      data: sortVideoIds,
    })

    await this.prisma.action.updateMany({
      data: {
        isActive: false,
      },
      where: {
        createdAt: {
          lte: new Date(moment().add(1, 'hour').format(MOMENT.HOUR_FORMAT)),
          gt: new Date(moment().format(MOMENT.HOUR_FORMAT)),
        },
      },
    })

    return sortVideoIds
  }
}
