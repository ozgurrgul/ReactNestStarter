import { Controller } from '@nestjs/common';

@Controller()
export class AppController {
  async test(): Promise<string> {
    return 'test';
  }
}
