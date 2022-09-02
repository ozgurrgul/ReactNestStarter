import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { VerifyTokenInput } from '@rns/dtos';
import { ok } from '../../utils/httpUtils';
import { JwtGuard } from '../auth/jwt.guard';
import { EmailVerificationService } from '../email-verification/email-verification.service';

@Controller({
  path: 'email',
})
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Post('verify-token')
  async verifyToken(@Body() body: VerifyTokenInput) {
    return ok(await this.emailVerificationService.verifyToken(body));
  }

  @UseGuards(JwtGuard)
  @Post('resend-verification')
  async resendVerification(@Request() req) {
    return ok(
      await this.emailVerificationService.resendVerificationEmail(req.user.id),
    );
  }
}
