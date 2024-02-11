import { NestFactory } from '@nestjs/core';
import { type INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app: INestApplication<AppModule> = await NestFactory.create(AppModule);
  const configService: ConfigService<unknown, boolean> = app.get(ConfigService);

  app.enableShutdownHooks();
  app.setGlobalPrefix('api/v1');

  app.use(cookieParser());
  app.enableCors({
    origin: configService.get<string>('FRONT_URL'),
    credentials: true,
  });
  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('Backend for EU Tours')
    .setDescription(
      'Backend will take care of authentication, authorization, billing, CRUD operations for tours, and many more features.',
    )
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port: number = configService.get<number>('PORT') || 5000;

  await app.listen(port);
}
bootstrap();
