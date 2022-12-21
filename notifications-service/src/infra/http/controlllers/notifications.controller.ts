import { Query, Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { SendNotification } from '@application/use-cases/send-notification'
import { NotificationViewModel } from '../view-models/notification-view-model'
import { CreateNotificationBody } from '../dtos/create-notification-body'
import { CancelNotification } from '@application/use-cases/cancel-notification'
import { ReadNotification } from '@application/use-cases/read-notification'
import { UnreadNotification } from '@application/use-cases/unread-notification'
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications'
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications'
import { GetCategoryNotifications } from '@application/use-cases/get-catergory-notifications'

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
    private getCategoryNotifications: GetCategoryNotifications
  ) {}

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId
    })
    return { count }
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId
    })
    return { notifications: NotificationViewModel.toManyHTTP(notifications) }
  }

  @Get()
  async getFromCategory(@Query('category') category: string) {
    const { notifications } = await this.getCategoryNotifications.execute({
      category
    })
    return { notifications: NotificationViewModel.toManyHTTP(notifications) }
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id
    })
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id
    })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    })
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    })

    return {
      notification: NotificationViewModel.toHTTP(notification)
    }
  }
}
