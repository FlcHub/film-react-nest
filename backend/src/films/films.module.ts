import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { FilmsDatabaseModule } from '../repository/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FilmsDatabaseModule
  ],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
