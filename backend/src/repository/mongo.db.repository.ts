import { Injectable, Inject } from '@nestjs/common';
import { AppConfig } from '../app.config.provider';
import { GetFilmDto, GetFilmsDto } from '../films/dto/films.dto';

import  mongoose, {Mongoose} from "mongoose";
import { FilmsRepository } from './films.repository';

const FilmSchema = new mongoose.Schema({
  id: { type: String, required: true },
  rating: { type: Number, required: true },
  director: { type: String, required: true },
  tags: { type: Array<String>, required: true },
  image: { type: String, required: true },
  cover: { type: String, required: true },
  title: { type: String, required: true },
  about: { type: String, required: true },
  description: { type: String, required: true },
});

const Film = mongoose.model('films', FilmSchema);

export default Film;

@Injectable()
export class FilmsMongoDbRepository implements FilmsRepository {
  constructor(@Inject('CONFIG') private config: AppConfig) {}

  private getFilmMapperFn(): (film) => GetFilmDto {
    return (film) => {
      return {
        id: film.id,
        rating: film.rating,
        director: film.director,
        tags: film.tags,
        image: film.image,
        cover: film.cover,
        title: film.title,
        about: film.about,
        description: film.description,
      };
    };
  }

  async findAll(): Promise<GetFilmsDto> {
    const films = await Film.find({});
    console.log('Here! ^^');
    return {
        films: films.map(this.getFilmMapperFn())
    };
  }
}