import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsMongoDbRepository } from './mongo.db.repository';
import { FilmSchema } from '../films/schemas/films.mongoose.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'films', schema: FilmSchema }])],
  providers: [FilmsMongoDbRepository],
  exports: [FilmsMongoDbRepository],
})
export class FilmsMongoDbModule {}
