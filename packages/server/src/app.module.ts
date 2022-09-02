import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CommunicationModule } from './modules/communication/communication.module';
import { EmailVerificationModule } from './modules/email-verification/email-verification.module';

ConfigModule.forRoot();

// Extended 'User' type of Passportjs
// TODO: Move somewhere else
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      id: number;
    }
  }
}

@Module({
  imports: [
    AuthModule,
    UserModule,
    CommunicationModule,
    EmailVerificationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
    PrismaService,
  ],
})
export class AppModule {}
