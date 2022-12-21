import { InMemoryNotifications } from '@test/repositories/in-memory-notifications-repository'
import { makeNotification } from '@test/factories/notification-factory'

import { ReadNotification } from './read-notification'
import { NotificationNotFound } from './errors/notification-not-found'

describe('read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotifications()
    const readNotification = new ReadNotification(notificationsRepository)

    const notification = makeNotification()

    await notificationsRepository.create(notification)

    await readNotification.execute({
      notificationId: notification.id
    })

    expect(notificationsRepository.notifications).toHaveLength(1)
    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date)
    )
  })

  it('should not be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotifications()
    const readNotification = new ReadNotification(notificationsRepository)

    const toThrow = async () =>
      await readNotification.execute({
        notificationId: 'fake-notification-id'
      })

    expect(toThrow).rejects.toThrow(NotificationNotFound)
  })
})
