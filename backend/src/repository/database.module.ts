import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseRepository } from './database.repository';
import { Film } from '../films/schemas/film.entity';
import { Schedule } from '../films/schemas/schedule.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<string>('DATABASE_DRIVER', 'postgres') as 'postgres',
        url: configService.get<string>('DATABASE_URL', 'postgres://prac:prac@localhost:5432/prac'),
        entities: [Film, Schedule],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Film, Schedule]),
  ],
  providers: [DatabaseRepository],
  exports: [DatabaseRepository],
})
export class FilmsDatabaseModule {}
