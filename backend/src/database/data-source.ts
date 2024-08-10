import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'dev' ? false : false,
  logging: process.env.NODE_ENV === 'dev' ? false : false,
  entities: [User],
  migrations: [__dirname + '/migration/*.ts'],
  subscribers: [],
});
