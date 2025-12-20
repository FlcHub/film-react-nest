import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { configProvider } from '../app.config.provider';
import { databaseProvider } from '../repository/data.base.provider';

@Module({
  controllers: [FilmsController],
  providers: [configProvider, databaseProvider, FilmsService],
})
export class FilmsModule {}
