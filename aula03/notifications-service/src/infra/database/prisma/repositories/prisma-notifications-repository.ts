import { Injectable } from '@nestjs/common'
import { Notification } from '@application/entities/notification'
import { NotificationsRepository } from '@application/repositories/notifications-repository'
import { PrismaService } from '../prisma.service'
import { PrismaMapper } from '../mappers/prisma-mapper'
import { NotificationNotFound } from '@application/use-cases/errors/notification-not-found'
import { raw } from '@prisma/client/runtime'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId
      }
    })

    if (!notification) return null

    return PrismaMapper.toDomain(notification)
  }
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId
      }
    })
    return PrismaMapper.toManyDomain(notifications)
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId
      }
    })
    return count
  }
  async create(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: PrismaMapper.toPrisma(notification)
    })
  }
  async save(notification: Notification): Promise<void> {
    const raw = PrismaMapper.toPrisma(notification)

    await this.prisma.notification.update({
      where: {
        id: raw.id
      },
      data: raw
    })
  }
}
