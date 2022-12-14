import { Body, Controller, Get, Post } from '@nestjs/common'
import { randomUUID } from 'node:crypto'
import { PrismaService } from './prisma.service'
import { CreateNotificationBody } from './create-notification-body'

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list() {
    return await this.prisma.notification.findMany()
  }
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body
    return await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        recipientId,
        content,
        category
      }
    })
  }
}
