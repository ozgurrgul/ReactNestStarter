import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginInput, RegisterInput } from '@rns/dtos';
import { EmailVerificationService } from '../email-verification/email-verification.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private emailVerificationService: EmailVerificationService,
  ) {}

  async login(body: LoginInput) {
    const user = await this.userService.findUser({
      email: body.email,
    });
    if (user) {
      const isValidPassword = await bcrypt.compare(
        body.password,
        user.password,
      );
      if (isValidPassword) {
        this.logger.log(
          `Credentials are matched, signing jwt for user ${user.email}`,
        );
        return this.jwtService.sign({ id: user.id, email: user.email });
      }
    }

    this.logger.log(`Invalid login attempt for user ${body.email}`);

    throw new Error('WRONG_CREDENTIALS');
  }

  async register(body: RegisterInput) {
    const salt = await bcrypt.genSalt(10);
    const user = await this.userService.createUser({
      ...body,
      password: await bcrypt.hash(body.password, salt),
    });
    this.logger.log(`User registered successfully ${body.email}`);
    this.logger.log(`Signing jwt for user ${user.email}`);

    // Don't block the HTTP call with verification email sending, so no await here
    this.emailVerificationService.sendVerificationEmail(user);
    return this.jwtService.sign({ id: user.id, email: user.email });
  }
}
