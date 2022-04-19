import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityController } from './city/city.controller';
import { CityModule } from './city/city.module';
import { CityService } from './city/city.service';
import { options } from './modules/db/ormconfig';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/db';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env'],
    }),
    DatabaseModule,
    CityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
