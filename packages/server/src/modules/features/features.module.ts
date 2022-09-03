import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';

@Module({
  imports: [],
  providers: [PrismaService, FeaturesService],
  exports: [FeaturesService],
  controllers: [FeaturesController],
})
export class FeaturesModule {}
