import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationsService {
  constructor() {
    if (!admin.apps.length) {
      const privateKey = process.env.PRIVATE_KEY
        ? process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
        : null;

      const clientEmail = process.env.CLIENT_EMAIL;
      const projectId = process.env.PROJECT_ID;

      if (!privateKey || !clientEmail || !projectId) {
        throw new Error(
          `Missing Firebase environment variables: ${
            !privateKey ? 'PRIVATE_KEY ' : ''
          }${!clientEmail ? 'CLIENT_EMAIL ' : ''}${
            !projectId ? 'PROJECT_ID' : ''
          }`,
        );
      }

      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          privateKey,
          clientEmail,
        }),
      });
    }
  }

  async sendPushNotification(deviceToken: string, title: string, body: string) {
    const message = {
      notification: {
        title,
        body,
      },
      token: deviceToken,
    };

    try {
      await admin.messaging().send(message);
      console.log('Push notification sent successfully');
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }
}
