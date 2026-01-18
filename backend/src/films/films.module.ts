import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { FilmsDatabaseModule } from '../repository/database.module';

@Module({
  imports: [FilmsDatabaseModule],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
