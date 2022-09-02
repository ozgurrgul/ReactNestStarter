import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CommunicationService {
  private readonly logger = new Logger(CommunicationService.name);

  // TODO: connect to email SaaS or SMTP
  async sendEmail(to: string, title: string, content: string) {
    this.logger.log(`sendEmail() called to send email ${to}`, {
      title,
      content,
    });
  }
}
