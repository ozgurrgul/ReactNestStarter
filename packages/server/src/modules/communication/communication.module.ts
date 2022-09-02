import { Module } from '@nestjs/common';
import { CommunicationService } from './communication.service';

@Module({
  providers: [CommunicationService],
  exports: [CommunicationService],
  controllers: [],
})
export class CommunicationModule {}
