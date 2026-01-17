import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../films/schemas/film.entity';
import { Schedule } from '../films/schemas/schedule.entity';

import {
  GetFilmDto,
  GetFilmsDto,
  GetScheduleDto,
  GetSchedulesDto,
} from '../films/dto/films.dto';

function getScheduleMapperFn(): (schedule: Schedule) => GetScheduleDto {
  return (schedule) => {
    return {
      id: schedule.id,
      daytime: new Date(schedule.daytime),
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken,
    };
  };
}

function getFilmMapperFn(): (film: Film) => GetFilmDto {
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

@Injectable()
export class DatabaseRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  async findAll(): Promise<GetFilmsDto> {
    const films = await this.filmRepository.find({ relations: ['schedule'] });
    console.log(films);
    console.log(films[0].schedule);
    return {
      total: films.length,
      items: films.map(getFilmMapperFn()),
    }
  }

  async findOne(id: string): Promise<GetSchedulesDto> {
    const film = await  this.filmRepository.findOneBy({ id });
    if (!film) {
      throw new HttpException('Фильм не найден', HttpStatus.NOT_FOUND);
    }
    console.log(film.schedule);
    return {
      total: film.schedule.length,
      items: film.schedule.map(getScheduleMapperFn()),
    };
  }
}
