import { DataSource, DataSourceOptions } from 'typeorm';

export const options: DataSourceOptions = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  type: 'postgres',
  name: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/migration/**/*{.ts,.js}'],
  subscribers: ['dist/src/subscriber/**/*{.ts,.js}'],
};

export const AppDataSource = new DataSource(options);
