import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from '@hapi/joi';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ThrottlerGuard } from '@nestjs/throttler';

import { DatabaseModule } from '@Database/database.module';
import { HealthModule } from '@Health/health.module';
import { RateLimiterModule } from '@RateLimiter/rate-limiter.module';

@Module({
  imports: [
    PrometheusModule.register({ global: true }),
    JwtModule.register({ global: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        PORT: Joi.number(),
        FRONT_URL: Joi.string().required(),
        THROTTLE_TTL: Joi.number().required(),
        THROTTLE_LIMIT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        JWT_COOKIE_EXPIRES_IN: Joi.number().required(),
        JWT_DOMAIN: Joi.string().required(),
        EMAIL_HOST: Joi.string().required(),
        EMAIL_PORT: Joi.number().required(),
        EMAIL_USERNAME: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        EMAIL_FROM: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    HealthModule,
    RateLimiterModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class BaseModule {}
