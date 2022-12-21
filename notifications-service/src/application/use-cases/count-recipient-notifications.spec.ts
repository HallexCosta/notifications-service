import { InMemoryNotifications } from '@test/repositories/in-memory-notifications-repository'
import { CountRecipientNotifications } from './count-recipient-notifications'
import { makeNotification } from '@test/factories/notification-factory'

describe('count recipient notification', () => {
  it('should be able to count recipient notification', async () => {
    const notificationsRepository = new InMemoryNotifications()
    const countRecipientNotification = new CountRecipientNotifications(
      notificationsRepository
    )

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' })
    )
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' })
    )
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' })
    )

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1'
    })

    expect(count).toEqual(2)
  })
})
