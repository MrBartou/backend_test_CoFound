import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import * as os from 'os';

@Injectable()
export class StatusService {
  private readonly logger = new Logger(StatusService.name);

  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly mailerService: MailerService,
  ) {}

  async checkDatabase(): Promise<{ status: boolean; error?: string }> {
    try {
      await this.dataSource.query('SELECT 1');
      this.logger.log('Database connection successful');
      return { status: true };
    } catch (error) {
      this.logger.error('Database connection failed', error.stack);
      return { status: false, error: error.message };
    }
  }

  async checkMailService(): Promise<{ status: boolean; error?: string }> {
    try {
      await this.mailerService.sendMail({
        to: 'hitsradio4@gmail.com',
        subject: 'Test Email',
        template: './test',
        context: {
          name: 'User',
        },
      });
      this.logger.log('Mail sent successfully');
      return { status: true };
    } catch (error) {
      this.logger.error('Mail sending failed', error.stack);
      return { status: false, error: error.message };
    }
  }

  getServerStats() {
    return {
      memoryUsage: process.memoryUsage().rss / 1024 / 1024,
      cpuUsage: os.loadavg()[0],
      uptime: process.uptime(),
    };
  }

  async getStatus(): Promise<any> {
    const databaseStatus = await this.checkDatabase();
    const mailServiceStatus = await this.checkMailService();
    const serverStats = this.getServerStats();

    return {
      data: {
        database: databaseStatus.status ? 'up' : 'down',
        databaseError: databaseStatus.error,
        mailService: mailServiceStatus.status ? 'up' : 'down',
        mailServiceError: mailServiceStatus.error,
        memoryUsage: `${serverStats.memoryUsage.toFixed(2)} MB`,
        cpuUsage: `${serverStats.cpuUsage.toFixed(2)}`,
        uptime: `${(serverStats.uptime / 60).toFixed(2)} minutes`,
        timestamp: new Date().toISOString(),
      },
    };
  }
}
