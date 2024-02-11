// This file is only used for manual SQL migrations (check `package.json` file).

import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: [join(__dirname, './../../../dist/', '**', '*.entity.{ts,js}')],
  synchronize: false,
  migrations: [join(__dirname, './../../../dist/', 'migrations', '*.{ts,js}')],
  migrationsRun: true,
});

/* 

Tutorial for TypeORM migrations:

1) Edit database:
  1.1) create new file -> book.entity.ts
    - configure table name, properties, relations, etc.
  1.2) change existing file
    - add new property (delete old) to already existing table
  1.3) delete file

2) when you are done, run this command: `npm run start` - or this instead: `npm run start:dev`
  - after Node.js compiles and runs, exit it with Ctrl + C

3) after exit, run this command: `npm run typeorm:generate-migration --name=AddPhoneNumber`
  - new file will appear in ./migrations/821281047128931-AddPhoneNumber.ts
  - edit the name of the file, and the name of the migration & save it

4) now run this command again: `npm run start` - or this instead: `npm run start:dev`

5) that's it, now you should have new changes saved in your local database

*/
