import { InMemoryNotifications } from '@test/repositories/in-memory-notifications-repository'
import { SendNotification } from './send-notification'

describe('send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotifications()
    const sendNotification = new SendNotification(notificationsRepository)

    const { notification } = await sendNotification.execute({
      content: 'Você tem uma nova solicitação',
      category: '',
      recipientId: 'example-recipient-id'
    })

    expect(notificationsRepository.notifications).toHaveLength(1)
    expect(notificationsRepository.notifications.shift()).toEqual(notification)
  })
})
