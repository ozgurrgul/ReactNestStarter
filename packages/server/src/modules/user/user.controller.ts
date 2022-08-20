import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ok } from '../../utils/httpUtils';
import { JwtGuard } from '../auth/jwt.guard';

@Controller({
  path: 'user',
})
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  async profile(@Request() req) {
    return ok(req.user);
  }
}
