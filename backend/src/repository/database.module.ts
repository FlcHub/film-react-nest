import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseRepository } from './database.repository';
import { Film } from '../films/schemas/film.entity';
import { Schedule } from '../films/schemas/schedule.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<string>('DATABASE_DRIVER', 'postgres') as 'postgres',
        url: configService.get<string>('DATABASE_URL', 'postgres://localhost:5432/prac'),
        username: configService.get<string>('DATABASE_USERNAME', 'prac'),
        password: configService.get<string>('DATABASE_PASSWORD', 'prac'),
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
