import { Notification as RawNotification } from '@prisma/client'

import { Notification } from '@application/entities/notification'
import { Content } from '@application/entities/content'

export class PrismaMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
      createdAt: notification.createdAt
    }
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt
      },
      raw.id
    )
  }

  static toManyDomain(notifications: RawNotification[]) {
    return notifications.map(PrismaMapper.toDomain)
  }
}
