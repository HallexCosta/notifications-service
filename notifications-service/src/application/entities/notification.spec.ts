import { Content } from './content'
import { Notification } from './notification'

describe('Notification', () => {
  it('shoud ble able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Nova solicitação de amizade'),
      category: 'social',
      recipientId: 'EXAMPLE RECIPIENT ID'
    })

    expect(notification).toBeTruthy()
  })
})
