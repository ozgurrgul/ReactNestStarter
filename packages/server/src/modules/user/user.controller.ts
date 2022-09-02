import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ok } from '../../utils/httpUtils';
import { JwtGuard } from '../auth/jwt.guard';
import { UserService } from './user.service';

@Controller({
  path: 'user',
})
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async profile(@Request() req) {
    const user = await this.userService.findUser({ id: req.user.id });
    delete user['password'];
    return ok(user);
  }
}
