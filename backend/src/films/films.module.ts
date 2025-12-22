import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { configProvider } from '../app.config.provider';
import { databaseProvider } from '../repository/data.base.provider';
import { FilmsMongoDbModule } from '../repository/mongo.db.module';

@Module({
  imports: [FilmsMongoDbModule],
  controllers: [FilmsController],
  providers: [configProvider, databaseProvider, FilmsService],
})
export class FilmsModule {}
