import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { FilmsMongoDbModule } from '../repository/mongo.db.module';
import { FilmsDatabaseModule } from '../repository/database.module';

@Module({
  imports: [FilmsDatabaseModule],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
