import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { User, Prisma } from '@rns/prisma';
import { RegisterInput } from '@rns/dtos';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser({ email, password, fullName }: RegisterInput) {
    try {
      await this.prisma.user.create({
        data: { email, password, fullName },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new Error('EMAIL_IN_USE');
        }
      }
      throw e;
    }
  }
}
