import { ActionService } from 'components/action/action.service'
import { VideoService } from 'components/video/video.service'
import { PrismaService } from 'services/prisma/prisma.service'
import { CronJob } from 'cron'

export class PostWorker {
  prisma: PrismaService
  videoService: VideoService
  constructor() {
    this.prisma = new PrismaService()
    this.initWorker()
  }

  private initWorker() {
    const actionService = new ActionService(this.prisma, this.videoService)
    const job = new CronJob('*/5 * * * *', async () => {
      console.log('The worker is running every 5m | ' + new Date())
      await actionService.handleSuggest()
    })

    job.start()
  }
}
