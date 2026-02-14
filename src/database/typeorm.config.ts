import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  url: configService.get<string>('database.url'),
  ssl: configService.get<boolean>('database.ssl')
    ? { rejectUnauthorized: true }
    : false,

  autoLoadEntities: true,

  synchronize: false, // Never true in production
  migrationsRun: true,

  logging: configService.get<string>('app.env') === 'development',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],

  extra: configService.get<boolean>('database.ssl')
    ? {
        uselibpqcompat: true,
      }
    : {},
});
