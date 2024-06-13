import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/../**/*.entities.{js,ts}'],
  synchronize: true,
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : false,
};
