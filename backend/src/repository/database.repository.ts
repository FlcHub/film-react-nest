import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Film, getFilmMapperFn } from '../films/schemas/film.entity';
import {
  Schedule,
  getScheduleMapperFn,
} from '../films/schemas/schedule.entity';

import {
  GetFilmsDto,
  GetScheduleDto,
  GetSchedulesDto,
} from '../films/dto/films.dto';

@Injectable()
export class DatabaseRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<GetFilmsDto> {
    const films = await this.filmRepository.find({ relations: ['schedule'] });
    return {
      total: films.length,
      items: films.map(getFilmMapperFn()),
    };
  }

  async findOne(id: string): Promise<GetSchedulesDto> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
    if (!film) {
      throw new HttpException('Фильм не найден', HttpStatus.NOT_FOUND);
    }
    return {
      total: film.schedule.length,
      items: film.schedule.map(getScheduleMapperFn()).sort((a, b) => a.daytime.getTime() - b.daytime.getTime()),
    };
  }

  async findSession(
    film_id: string,
    session_id: string,
  ): Promise<GetScheduleDto> {
    const session = await this.scheduleRepository.findOne({
      where: { id: session_id, film: { id: film_id } },
      relations: ['film'],
    });
    if (!session) {
      throw new HttpException('Сеанс не найден', HttpStatus.NOT_FOUND);
    }
    return getScheduleMapperFn()(session);
  }

  async updateSessionTaken(
    film_id: string,
    schedule: GetScheduleDto,
  ): Promise<boolean> {
    const result = await this.scheduleRepository
      .createQueryBuilder()
      .update(Schedule)
      .set({ taken: schedule.taken.join(',') })
      .where('id = :id', { id: schedule.id })
      .andWhere('filmId = :film_id', { film_id: film_id })
      .execute();

    if (result.affected === 0) {
      throw new HttpException('Сеанс не найден', HttpStatus.NOT_FOUND);
    }

    return true;
  }
}
