import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseRepository } from './database.repository';
import { Film } from '../films/schemas/film.entity';
import { Schedule } from '../films/schemas/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film]),
    TypeOrmModule.forFeature([Module]),
    TypeOrmModule.forRoot({
      type: (process.env.DATABASE_DRIVER as 'mongodb' | 'postgres') || 'postgres',
      url: process.env.DATABASE_URL || 'mongodb://localhost:27017/prac',
      host: 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'prac',
      entities: [Film, Schedule],
      synchronize: false,
    }),
  ],
  providers: [DatabaseRepository],
  exports: [DatabaseRepository],
})
export class FilmsDatabaseModule {}
