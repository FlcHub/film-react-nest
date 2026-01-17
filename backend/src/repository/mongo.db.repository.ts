import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Film,
  getFilmMapperFn,
  getScheduleMapperFn,
} from '../films/schemas/films.mongoose.schema';
import {
  GetFilmsDto,
  GetScheduleDto,
  GetSchedulesDto,
} from '../films/dto/films.dto';

@Injectable()
export class FilmsMongoDbRepository {
  constructor(@InjectModel('films') private readonly filmModel: Model<Film>) {}

  async findAll(): Promise<GetFilmsDto> {
    const films = await this.filmModel.find().exec();
    return {
      total: films.length,
      items: films.map(getFilmMapperFn()),
    };
  }

  async findOne(id: string): Promise<GetSchedulesDto> {
    const film = await this.filmModel.findOne({ id }).exec();
    if (!film) {
      throw new HttpException('Фильм не найден', HttpStatus.NOT_FOUND);
    }
    return {
      total: film.schedule.length,
      items: film.schedule.map(getScheduleMapperFn()),
    };
  }

  async findSession(
    film_id: string,
    session_id: string,
  ): Promise<GetScheduleDto> {
    const film = await this.filmModel
      .findOne({ id: film_id, 'schedule.id': session_id }, { 'schedule.$': 1 })
      .exec();
    if (!film) {
      throw new HttpException('Сеанс не найден', HttpStatus.NOT_FOUND);
    }
    return getScheduleMapperFn()(film.schedule[0]);
  }

  async updateSessionTaken(
    film_id: string,
    schedule: GetScheduleDto,
  ): Promise<boolean> {
    await this.filmModel
      .updateOne(
        { id: film_id, 'schedule.id': schedule.id },
        { $set: { 'schedule.$.taken': schedule.taken } },
      )
      .exec();

    return true;
  }
}
