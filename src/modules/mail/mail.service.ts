import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(user: any, token: string) {
    const url = `http://${process.env.BASE_URL}/auth/confirm-email?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to our app! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.name,
        url,
      },
    });
  }

  async sendPasswordReset(user: any, token: string) {
    const url = `http://${process.env.BASE_URL}/auth/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      template: './reset-password',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
