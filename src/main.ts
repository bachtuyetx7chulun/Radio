import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from 'app.module'
import { NextFunction, Request, Response } from 'express'

async function Application() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix('/api/v1')
  app.use((_: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', '*')
    next()
  })
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  })
  app.disable('x-powered-by')
  await app.listen(process.env.PORT)
}

Application()
