import { Controller, Post, Body } from '@nestjs/common';
import { ok } from '../../utils/httpUtils';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from '@rns/dtos';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginInput) {
    return ok(await this.authService.login(body));
  }

  @Post('register')
  async register(@Body() body: RegisterInput) {
    return ok(await this.authService.register(body));
  }
}
