/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Quiz } from 'src/modules/quiz/entities/quiz.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  driver: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'charity',
  database: 'quizes',
  entities: [Quiz],
  synchronize: true,
};
