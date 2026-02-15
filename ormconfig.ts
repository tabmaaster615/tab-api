import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : false,
  extra: process.env.DB_SSL === 'true' ? { uselibpqcompat: true } : {},

  entities: [join(__dirname, '**/*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  // Safety first
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
});
