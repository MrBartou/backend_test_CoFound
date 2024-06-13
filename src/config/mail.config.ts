import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

export const getMailConfig = async (
  configService: ConfigService,
): Promise<MailerOptions> => {
  const host = configService.get<string>('SMTP_HOST');
  const port = parseInt(configService.get<string>('SMTP_PORT'), 10);
  const user = configService.get<string>('SMTP_USER');
  const pass = configService.get<string>('SMTP_PASSWORD');

  const transport: any = {
    host,
    port,
    secure: false,
  };

  if (user && pass) {
    transport.auth = { user, pass };
  }

  return {
    transport,
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
};
