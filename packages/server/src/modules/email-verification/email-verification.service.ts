import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { User } from '@rns/prisma';
import { VerifyTokenInput } from '@rns/dtos';
import { CommunicationService } from '../communication/communication.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { FeaturesService } from '../features/features.service';
import { EmailVerificationFeature } from '../features/types';

type TokenPayload = { userId: number };

@Injectable()
export class EmailVerificationService {
  private readonly logger = new Logger(EmailVerificationService.name);

  constructor(
    private prisma: PrismaService,
    private communicationService: CommunicationService,
    private jwtService: JwtService,
    private userService: UserService,
    private featuresService: FeaturesService,
  ) {}

  async sendVerificationEmail(user: User) {
    this.logger.log(
      `Started send verification email process for user ${user.email}`,
    );
    const payload: TokenPayload = { userId: user.id };
    const token = this.jwtService.sign(payload, {
      expiresIn: `300s`,
      secret: (
        this.featuresService.getFeature(
          'emailVerification',
        ) as EmailVerificationFeature
      ).privateConfig.tokenSecret,
    });
    const title = 'Email Verification';
    const content = `Please go to following link to verify your email: ${process.env.WEBAPP_URL}/email/verify?token=${token}`;
    await this.communicationService.sendEmail(user.email, title, content);
  }

  async resendVerificationEmail(userId: number) {
    const user = await this.userService.findUser({ id: userId });
    if (!user) {
      this.logger.log(`User ${userId} not found`);
      throw new Error('USER_NOT_FOUND');
    }
    if (user.emailVerified) {
      this.logger.log(
        `User ${userId} is already verified, not sending verify email`,
      );
      return;
    }
    await this.sendVerificationEmail(user);
  }

  async verifyToken(body: VerifyTokenInput) {
    const { token } = body;
    this.logger.log(`Started verifying email for token ${token}`);
    let payload: TokenPayload;
    try {
      payload = await this.jwtService.verify(token, {
        secret: (
          this.featuresService.getFeature(
            'emailVerification',
          ) as EmailVerificationFeature
        ).privateConfig.tokenSecret,
      });
    } catch (err) {
      this.logger.log('Token verifying failed ' + err);
      throw new Error('USER_EMAIL_VERIFICATION_TOKEN_VERIFY_FAILED');
    }

    if (!payload) {
      throw new Error('USER_EMAIL_VERIFICATION_TOKEN_NOT_VALID');
    }

    const { userId } = payload;
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (user.emailVerified) {
      throw new Error('USER_EMAIL_VERIFICATION_ALREADY_VERIFIED');
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: true,
      },
    });
  }
}
