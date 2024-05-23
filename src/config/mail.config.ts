import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailConfig: MailerOptions = {
  transport: {
    host: process.env.MAILGUN_SMTP_SERVER,
    port: parseInt(process.env.MAILGUN_SMTP_PORT, 10),
    auth: {
      user: process.env.MAILGUN_SMTP_LOGIN,
      pass: process.env.MAILGUN_SMTP_PASSWORD,
    },
    secure: false,
  },
  defaults: {
    from: '"No Reply" <noreply@cofound.com>',
  },
  template: {
    dir: __dirname + '/../modules/mail/templates/',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
