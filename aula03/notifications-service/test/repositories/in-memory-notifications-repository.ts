import { Notification } from '../../src/application/entities/notification'
import { NotificationsRepository } from '../../src/application/repositories/notifications-repository'

export class InMemoryNotifications implements NotificationsRepository {
  public notifications: Notification[] = []

  async findById(notificationId: string): Promise<Notification | null> {
    return (
      this.notifications.find(
        (notification) => notification.id === notificationId
      ) ?? null
    )
  }
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId
    )
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId
    ).length
  }
  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }
  async save(notification: Notification): Promise<void> {
    const notificationIndex = await this.notifications.findIndex(
      (item) => item.id === notification.id
    )
    if (notificationIndex) this.notifications[notificationIndex] = notification
  }
}
