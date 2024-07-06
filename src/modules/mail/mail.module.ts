import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMailConfig } from '../../config/mail.config';
import { MailService } from './mail.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        await getMailConfig(configService),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
