import { InMemoryNotifications } from '@test/repositories/in-memory-notifications-repository'
import { makeNotification } from '@test/factories/notification-factory'

import { UnreadNotification } from './unread-notification'
import { NotificationNotFound } from './errors/notification-not-found'

describe('unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotifications()
    const unreadNotification = new UnreadNotification(notificationsRepository)

    const notification = makeNotification({
      readAt: new Date()
    })

    await notificationsRepository.create(notification)

    await unreadNotification.execute({
      notificationId: notification.id
    })

    expect(notificationsRepository.notifications).toHaveLength(1)
    expect(notificationsRepository.notifications[0].readAt).toBeNull()
  })

  it('should not be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotifications()
    const readNotification = new UnreadNotification(notificationsRepository)

    const toThrow = async () =>
      await readNotification.execute({
        notificationId: 'fake-notification-id'
      })

    expect(toThrow).rejects.toThrow(NotificationNotFound)
  })
})
