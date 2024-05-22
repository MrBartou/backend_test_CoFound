import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as dotenv from 'dotenv';

dotenv.config();

export const mailConfig: MailerOptions = {
  transport: {
    host: process.env.SMTP_HOST || 'mailhog',
    port: parseInt(process.env.SMTP_PORT, 10) || 1025,
    secure: false,
  },
  defaults: {
    from: '"No Reply" <noreply@example.com>',
  },
  template: {
    dir: __dirname + '/../modules/mail/templates/',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
