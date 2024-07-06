import { Controller, Post, Req, Res } from '@nestjs/common';
import { MailService } from './mail.service';
import { Request, Response } from 'express';

@Controller('github-webhook')
export class GitHubWebhookController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async handleGitHubWebhook(@Req() req: Request, @Res() res: Response) {
    const payload = req.body;

    if (payload.action === 'published') {
      const changelogUrl = payload.release.html_url;
      const isPrerelease = payload.release.prerelease;
      const features = payload.release.body
        .split('\n')
        .filter((line) => line.startsWith('-'));

      await this.mailService.sendNewFeaturesNotification(
        features,
        changelogUrl,
        isPrerelease,
      );

      res.status(200).send('Webhook received and processed');
    } else {
      res.status(400).send('Not a release event');
    }
  }
}
