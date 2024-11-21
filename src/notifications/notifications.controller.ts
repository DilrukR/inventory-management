import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('send')
  async sendNotification(
    @Body('deviceToken') deviceToken: string,
    @Body('title') title: string,
    @Body('body') body: string,
  ) {
    await this.notificationsService.sendPushNotification(
      deviceToken,
      title,
      body,
    );
    return { message: 'Notification sent!' };
  }
}
