import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { UserService } from 'src/modules/user/user.service';
import { UserController } from './user.controller';

@Module({
  providers: [PrismaService, UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
