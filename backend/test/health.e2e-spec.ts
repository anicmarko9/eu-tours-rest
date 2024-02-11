import { type INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '@/app.module';

describe('HealthController (e2e)', () => {
  let app: INestApplication<any>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('/health/database (GET)', () => {
    it('should return 200 because database is up and running', async () => {
      const response = await request(app.getHttpServer()).get(
        '/health/database',
      );

      expect(response.status).toEqual(200);
      const responseBody: any = response.body;
      expect(responseBody).toEqual({
        status: 'ok',
        info: { database: { status: 'up' } },
        error: {},
        details: { database: { status: 'up' } },
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
