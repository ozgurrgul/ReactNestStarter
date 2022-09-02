import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { User } from '@rns/prisma';
import { VerifyTokenInput } from '@rns/dtos';
import { CommunicationService } from '../communication/communication.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class EmailVerificationService {
  private readonly logger = new Logger(EmailVerificationService.name);

  constructor(
    private prisma: PrismaService,
    private communicationService: CommunicationService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async sendVerificationEmail(user: User) {
    this.logger.log(
      `Started send verification email process for user ${user.email}`,
    );
    const payload = { userId: user.id };
    const token = this.jwtService.sign(payload, {
      expiresIn: `300s`,
      secret: process.env.EMAIL_VERIFICATION_TOKEN_SECRET,
    });
    this.logger.log(`Email verification token is ${token}`);

    const title = 'Email Verification';
    const content = `Please go to following link to verify your email: ${process.env.WEBAPP_URL}/email/verify?token=${token}`;
    await this.communicationService.sendEmail(user.email, title, content);
  }

  async resendVerificationEmail(userId: number) {
    const user = await this.userService.findUser({ id: userId });
    if (user.emailVerified) {
      this.logger.log(`User is already verified, not sending verify email`);
      return;
    }
    await this.sendVerificationEmail(user);
  }

  async verifyToken(body: VerifyTokenInput) {
    const { token } = body;
    this.logger.log(`Started verifying email for token ${token}`);
    const payload = await this.jwtService.verify(token, {
      secret: process.env.EMAIL_VERIFICATION_TOKEN_SECRET,
    });

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
