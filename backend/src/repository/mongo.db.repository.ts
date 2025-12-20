import { Injectable, Inject } from '@nestjs/common';
import { AppConfig } from '../app.config.provider';
import { GetFilmDto, GetFilmsDto, GetScheduleDto } from '../films/dto/films.dto';

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
  schedule: { type: [{
    id: { type: String, required: true },
    daytime: { type: String, required: true },
    hall: { type: String, required: true },
    rows: { type: Number, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    taken: { type: Array<String>, required: true },
  }], required: true }, // тут тоже не понятно
});

const Film = mongoose.model('films', FilmSchema);

export default Film;

@Injectable()
export class FilmsMongoDbRepository implements FilmsRepository {
  constructor(@Inject('CONFIG') private config: AppConfig) {}

  private getScheduleMapperFn(): (schedule) => GetScheduleDto {
    return (schedule) => ({
      id: schedule.id,
      daytime: schedule.string,
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken,
    });
  }

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
        schedule: film.schedule.map(this.getScheduleMapperFn()),
      };
    };
  }

  async findAll(): Promise<GetFilmsDto> {
    const films = await Film.find({});
    return {
        items: films.map(this.getFilmMapperFn())
    };
  }

  async findOne(id: string): Promise<GetFilmDto> {
    const film = await Film.findOne({ id });
    return this.getFilmMapperFn()(film);
  }
}