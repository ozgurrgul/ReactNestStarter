import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CommunicationModule } from '../communication/communication.module';
import { UserModule } from '../user/user.module';
import { EmailVerificationController } from './email-verification.controller';
import { EmailVerificationService } from './email-verification.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [CommunicationModule, UserModule, JwtModule],
  providers: [PrismaService, EmailVerificationService],
  exports: [EmailVerificationService],
  controllers: [EmailVerificationController],
})
export class EmailVerificationModule {}
