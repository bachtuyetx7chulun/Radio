import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from 'app.controller'
import { AppService } from 'app.service'
import { ActionModule } from 'action/action.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    ActionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
