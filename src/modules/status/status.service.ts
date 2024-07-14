import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class StatusService {
  private readonly logger = new Logger(StatusService.name);

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly mailerService: MailerService,
  ) {}

  async checkDatabase(): Promise<boolean> {
    try {
      await this.dataSource.query('SELECT 1');
      this.logger.log('Database connection successful');
      return true;
    } catch (error) {
      this.logger.error('Database connection failed', error.stack);
      return false;
    }
  }

  async checkMailService(): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: 'test@example.com',
        subject: 'Test Email',
        template: './test',
        context: {
          name: 'User',
        },
      });
      this.logger.log('Mail sent successfully');
      return true;
    } catch (error) {
      this.logger.error('Mail sending failed', error.stack);
      return false;
    }
  }

  async getStatus(): Promise<any> {
    const databaseStatus = await this.checkDatabase();
    const mailServiceStatus = await this.checkMailService();

    return {
      data: {
        database: databaseStatus ? 'up' : 'down',
        mailService: mailServiceStatus ? 'up' : 'down',
        timestamp: new Date().toISOString(),
      },
    };
  }
}
