import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'services/prisma/prisma.service'
import { isEmpty } from 'lodash'
import * as moment from 'moment'
import { MOMENT } from 'constants/index'
import * as _ from 'lodash'
import { VideoService } from 'components/video/video.service'

@Injectable()
export class ActionService {
  constructor(private readonly prisma: PrismaService, private readonly videoService: VideoService) {}

  // * Post guess list video form client
  public async postSugguest(ipPublic: string, videoIds: string[]) {
    // * Check ip public
    if (isEmpty(ipPublic)) throw new BadRequestException('ipPublic is required')

    console.log(ipPublic)

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
        isActived: false,
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

    const sortVideoIds = _.orderBy(videos, ['votes'], ['desc']).slice(0, 10)
    await this.prisma.video.createMany({
      data: sortVideoIds,
    })

    await this.prisma.action.updateMany({
      data: {
        isActived: true,
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

  // * Get current video
  public async getCurrentVideo() {
    const currentVideo = await this.prisma.play.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (_.isEmpty(currentVideo)) {
      const video = await this.prisma.video.findFirst({
        where: {
          isPlayed: false,
        },
      })

      if (_.isEmpty(video)) throw new BadRequestException('Videos is not exist')

      const newPlayVideo = await this.prisma.play.create({
        data: {
          videoId: video.videoId,
        },
      })

      const detailVideo = await this.videoService.getVideosByIds([video.videoId])
      return {
        ...newPlayVideo,
        duration: detailVideo[0]?.contentDetails?.duration,
      }
    }

    const detailVideo = await this.videoService.getVideosByIds([currentVideo.videoId])
    return {
      ...currentVideo,
      duration: detailVideo[0]?.contentDetails?.duration,
    }
  }

  // * Set current video
  public async setCurrentVideo(videoId: string) {
    // TODO: Check videoId is equal the latest videoId
    const latestVideo = await this.prisma.play.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    })
    if (latestVideo && latestVideo.videoId === videoId) return latestVideo

    // TODO : Check videoId is exist
    const playList = await this.prisma.video.findMany({
      where: {
        isPlayed: false,
      },
    })

    const videoIds = playList.map((video) => video.videoId)
    if (!_.includes(videoIds, videoId)) throw new BadRequestException('Video is not exist')

    // TODO Update video isPlayed and create a new play
    await this.prisma.video.updateMany({
      data: {
        isPlayed: true,
      },
      where: {
        videoId: latestVideo.videoId,
      },
    })

    const newPlayVideo = await this.prisma.play.create({
      data: {
        videoId,
      },
    })

    return newPlayVideo
  }

  // * Get top music
  public async getTrending() {
    return await this.videoService.getTrending()
  }

  // * Get random videos
  public async getRandomVideos() {
    const playList = await this.prisma.video.findMany({
      where: {
        isPlayed: false,
      },
    })

    if (playList.length > 1) return playList

    const videos = await this.videoService.getTrending(35)
    const randomVideos = _.sampleSize(videos, 5)
    const randomVideoIds = randomVideos.map((video) => {
      return {
        videoId: video?.id,
        votes: 1,
      }
    })

    await this.prisma.video.createMany({
      data: randomVideoIds,
    })

    return randomVideos
  }
}
