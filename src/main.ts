import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from 'app.module'

async function Application() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix('/api/v1')
  app.disable('x-powered-by')
  await app.listen(process.env.PORT)
}

Application()
