import { InMemoryNotifications } from '@test/repositories/in-memory-notifications-repository'
import { GetCategoryNotifications } from './get-catergory-notifications'
import { makeNotification } from '@test/factories/notification-factory'

describe('get recipient notification', () => {
  it('should be able to get recipient notification', async () => {
    const notificationsRepository = new InMemoryNotifications()
    const getRecipientNotification = new GetCategoryNotifications(
      notificationsRepository
    )

    await notificationsRepository.create(
      makeNotification({ category: 'social' })
    )
    await notificationsRepository.create(
      makeNotification({ category: 'social' })
    )
    await notificationsRepository.create(
      makeNotification({ category: 'study' })
    )

    const { notifications } = await getRecipientNotification.execute({
      category: 'social'
    })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: 'social'
        })
      ])
    )
  })
})
