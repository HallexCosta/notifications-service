import { InMemoryNotifications } from '@test/repositories/in-memory-notifications-repository'
import { makeNotification } from '@test/factories/notification-factory'

import { CancelNotification } from './cancel-notification'
import { NotificationNotFound } from './errors/notification-not-found'

describe('cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotifications()
    const cancelNotification = new CancelNotification(notificationsRepository)

    const notification = makeNotification()

    await notificationsRepository.create(notification)

    await cancelNotification.execute({
      notificationId: notification.id
    })

    expect(notificationsRepository.notifications).toHaveLength(1)
    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date)
    )
  })

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotifications()
    const cancelNotification = new CancelNotification(notificationsRepository)

    const toThrow = async () =>
      await cancelNotification.execute({
        notificationId: 'fake-notification-id'
      })

    expect(toThrow).rejects.toThrow(NotificationNotFound)
  })
})
