import { CancelNotification } from '@application/use-cases/cancel-notification'
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications'
import { GetCategoryNotifications } from '@application/use-cases/get-catergory-notifications'
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications'
import { ReadNotification } from '@application/use-cases/read-notification'
import { UnreadNotification } from '@application/use-cases/unread-notification'
import { Module } from '@nestjs/common'
import { SendNotification } from 'src/application/use-cases/send-notification'
import { HomeController } from './controlllers/home.controller'
import { NotificationsController } from './controlllers/notifications.controller'

import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [HomeController, NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    GetRecipientNotifications,
    CountRecipientNotifications,
    GetCategoryNotifications
  ]
})
export class HttpModule {}
