import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginInput, RegisterInput } from './models/inputs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginInput) {
    const user = await this.userService.user({
      email: body.email,
    });
    if (user) {
      const isValidPassword = await bcrypt.compare(
        body.password,
        user.password,
      );
      if (isValidPassword) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user;
        this.logger.log(
          `Credentials are matched, signing jwt for user ${user.email}`,
        );
        return this.jwtService.sign(rest);
      }
    }

    this.logger.log(`Invalid login attempt for user ${body.email}`);

    throw new Error('WRONG_CREDENTIALS');
  }

  async register(body: RegisterInput) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(body.password, salt);
    await this.userService.createUser({
      ...body,
      password,
    });
    this.logger.log(`User registered successfully ${body.email}`);
    return await this.login(body);
  }
}
