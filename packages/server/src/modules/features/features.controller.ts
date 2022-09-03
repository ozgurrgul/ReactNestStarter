import { Controller, Get } from '@nestjs/common';
import { ok } from '../../utils/httpUtils';
import { FeaturesService } from './features.service';

@Controller({
  path: 'features',
})
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get('list')
  async listFeatures() {
    return ok(this.featuresService.listFeatures());
  }
}
