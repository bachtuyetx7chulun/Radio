import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'
import { ActionService } from './action.service'

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}
  @Get('search')
  async search(@Req() req: Request): Promise<any> {
    return this.actionService.search(req.query.q as string)
  }
}
