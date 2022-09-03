import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CommunicationService {
  private readonly logger = new Logger(CommunicationService.name);

  /**
   * Connect to your favorite email provider or a direct SMTP
   * Send the email
   */
  async sendEmail(to: string, title: string, content: string) {
    this.logger.log(`sendEmail() called to send email ${to}`, {
      title,
      content,
    });
  }
}
