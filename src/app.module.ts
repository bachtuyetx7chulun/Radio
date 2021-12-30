import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from 'app.controller'
import { AppService } from 'app.service'
import { ActionModule } from 'components/action/action.module'
import { AuthMiddleware } from 'components/auth/auth.middleware'
import { AuthModule } from 'components/auth/auth.module'
import { PrismaModule } from 'services/prisma/prisma.module'
import { YoutubeModule } from 'services/youtube/youtube.module'
import { EventsModule } from 'services/socket/socket.module'
import { VideoModule } from './components/video/video.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    YoutubeModule,
    PrismaModule,
    AuthModule,
    ActionModule,
    EventsModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
