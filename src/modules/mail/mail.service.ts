import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(user: any, token: string) {
    const url = `http://${process.env.BASE_URL}/auth/confirm-email?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject:
        'Bienvenue sur notre plateforme ! Confirmez votre adresse email.',
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
      subject: 'Réinitialisation de votre mot de passe',
      template: './reset-password',
      context: {
        name: user.name,
        url,
      },
    });
  }

  async projectCreated(user: any, project: any) {
    const url = `http://${process.env.BASE_URL}/projects/${project.id}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: "Votre projet vient d'être publié !",
      template: './project-created',
      context: {
        name: user.name,
        projectTitle: project.title,
        url,
      },
    });
  }
}
