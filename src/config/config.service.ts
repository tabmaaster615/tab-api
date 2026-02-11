import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import appConfig from './app.config';
import databaseConfig from './database.config';
import authConfig from './auth.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().required(),
        NODE_ENV: Joi.string()
        .valid('development', 'production', 'test').required(),
        PORT: Joi.number().default(3000),
    }),
  ],
})
export class ConfigModule {}
