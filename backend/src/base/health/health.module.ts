import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule.forRoot({ logger: false, errorLogStyle: 'pretty' })],
  controllers: [HealthController],
})
export class HealthModule {}
