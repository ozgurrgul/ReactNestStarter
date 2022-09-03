import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { VerifyTokenInput } from '@rns/dtos';
import { error, ok } from '../../utils/httpUtils';
import { JwtGuard } from '../auth/jwt.guard';
import { EmailVerificationService } from '../email-verification/email-verification.service';
import { FeaturesService } from '../features/features.service';

@Controller({
  path: 'email',
})
export class EmailVerificationController {
  constructor(
    private readonly featuresService: FeaturesService,
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Post('verify-token')
  async verifyToken(@Body() body: VerifyTokenInput) {
    if (!this.featuresService.isFeatureEnabled('emailVerification')) {
      return error('emailVerification is not enabled');
    }
    return ok(await this.emailVerificationService.verifyToken(body));
  }

  @UseGuards(JwtGuard)
  @Post('resend-verification')
  async resendVerification(@Request() req) {
    if (!this.featuresService.isFeatureEnabled('emailVerification')) {
      return error('emailVerification is not enabled');
    }
    return ok(
      await this.emailVerificationService.resendVerificationEmail(req.user.id),
    );
  }
}
