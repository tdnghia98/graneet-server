import { Injectable, Module } from '@nestjs/common';
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        let config: TypeOrmModuleOptions = {
          url: configService.get<string>('DATABASE_URL'),
          type: 'postgres',
          host: configService.get<string>('DATABASE_HOST'),
          port: parseInt(configService.get<string>('DATABASE_PORT')),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          migrations: ['dist/src/migration/**/*{.ts,.js}'],
          subscribers: ['dist/src/subscriber/**/*{.ts,.js}'],
          synchronize: configService.get<string>('NODE_ENV') === 'development',
        };

        if (configService.get<string>('NODE_ENV') === 'production') {
          config = {
            ...config,
            extra: {
              ssl: {
                rejectUnauthorized: false,
              },
            },
          };
        }
        return config;
      },
    }),
  ],
})
export class DatabaseModule {}
