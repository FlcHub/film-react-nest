import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GetFilmDto, GetScheduleDto } from '../dto/films.dto';

@Schema({ _id: false })
export class Schedule {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  daytime: string;

  @Prop({ required: true })
  hall: number;

  @Prop({ required: true })
  rows: number;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [String], required: true })
  taken: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

@Schema()
export class Film extends Document {
  @Prop({ require: true })
  readonly id: string;

  @Prop({ require: true })
  readonly rating: number;

  @Prop({ require: true })
  readonly director: string;

  @Prop({ type: [String], require: true })
  readonly tags: string[];

  @Prop({ require: true })
  readonly image: string;

  @Prop({ require: true })
  readonly cover: string;

  @Prop({ require: true })
  readonly title: string;

  @Prop({ require: true })
  readonly about: string;

  @Prop({ require: true })
  readonly description: string;

  @Prop({ type: [ScheduleSchema], require: true })
  readonly schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);

export function getScheduleMapperFn(): (schedule: Schedule) => GetScheduleDto {
  return (schedule) => ({
    id: schedule.id,
    daytime: new Date(schedule.daytime),
    hall: schedule.hall,
    rows: schedule.rows,
    seats: schedule.seats,
    price: schedule.price,
    taken: schedule.taken,
  });
}

export function getFilmMapperFn(): (film: Film) => GetFilmDto {
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
      schedule: film.schedule.map(getScheduleMapperFn()),
    };
  };
}
