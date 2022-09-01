import { Controller, Post, Body } from '@nestjs/common';
import { ok } from '../../utils/httpUtils';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from '@rns/dtos';
import axios from 'axios';

const checkRecaptcha = async (token: string) => {
  const captchaResponse = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  );
  if (!captchaResponse.data.success) {
    throw new Error('RECAPTCHA_FAIL');
  }
};

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginInput) {
    await checkRecaptcha(body.recaptcha_token);
    return ok(await this.authService.login(body));
  }

  @Post('register')
  async register(@Body() body: RegisterInput) {
    await checkRecaptcha(body.recaptcha_token);
    return ok(await this.authService.register(body));
  }
}
