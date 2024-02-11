import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthCheckService,
    private readonly dbHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @Get('database')
  @ApiOperation({
    summary: 'Checks if the database is up and running.',
    description:
      'This API route can be used as a debugging tool to check if the database is correctly setup and connected to this backend service.',
  })
  @HealthCheck()
  async checkDatabase(): Promise<HealthCheckResult> {
    return await this.healthService.check([
      async (): Promise<HealthIndicatorResult> =>
        await this.dbHealthIndicator.pingCheck('database'),
    ]);
  }
}
