import { Notification } from '@application/entities/notification'
import { NotificationsRepository } from '@application/repositories/notifications-repository'
import { Injectable } from '@nestjs/common'

interface GetCategoryNotificationsRequest {
  category: string
}
interface GetCategoryNotificationsResponse {
  notifications: Notification[]
}

@Injectable()
export class GetCategoryNotifications {
  constructor(
    private notificationsRepository: NotificationsRepository
  ) {}

  async execute(request: GetCategoryNotificationsRequest): Promise<GetCategoryNotificationsResponse> {
    const { category } = request

    const notifications = await this.notificationsRepository.findManyByCategory(category)

    return { notifications }
  }
}
