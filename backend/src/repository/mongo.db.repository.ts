import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { AppConfig } from '../app.config.provider';
import { GetFilmDto, GetFilmsDto, GetScheduleDto, GetSchedulesDto } from '../films/dto/films.dto';
import { PostOrderDto } from '../order/dto/order.dto';

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

type TMongooseSchedule = mongoose.Types.Subdocument<mongoose.Types.ObjectId, any, {
  id: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: any[];
}> & {
  id: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: any[];
};

@Injectable()
export class FilmsMongoDbRepository implements FilmsRepository {
  constructor(@Inject('CONFIG') private config: AppConfig) {}

  private getOrderMapperFn(): (order) => PostOrderDto {
    return (order) => ({
      film: order.film,
      session: order.session,
      daytime: order.daytime,
      row: order.row,
      seat: order.seat,
      price: order.price,
    });
  }

  private getScheduleMapperFn(): (schedule) => GetScheduleDto {
    return (schedule) => ({
      id: schedule.id,
      daytime: schedule.daytime,
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
        total: films.length,
        items: films.map(this.getFilmMapperFn()),
    };
  }

  async findOne(id: string): Promise<GetSchedulesDto> {
    const film = await Film.findOne({ id });
    if (!film) {
      throw new HttpException('Фильм не найден', HttpStatus.NOT_FOUND);
    }
    return {
      total: film.schedule.length,
      items: film.schedule.map(this.getScheduleMapperFn()),
    };
  }

  async createOrder(orders: PostOrderDto[]): Promise<PostOrderDto[]> {
    const sessions = new Map<string, TMongooseSchedule>();
    console.log(orders);
    // найти все сеансы и проверить доступность мест
    for (const order of orders) {
      const film = await Film.findOne({ id: order.film, 'schedule.id': order.session }, { 'schedule.$': 1 });
      if (!film) {
        throw new HttpException('Сеанс не найден', HttpStatus.NOT_FOUND);
      }
      const session = film.schedule[0];
      if (session.taken.find(el => el === `${order.row}:${order.seat}`)
        || order.row > session.rows
        || order.seat > session.seats
      ) {
        throw new HttpException(`Невозможно забронировать место ${order.row}:${order.seat}`, HttpStatus.BAD_REQUEST);
      }
      const s = sessions.get(`${order.film}:${order.session}`);
      if (s) {
        s.taken.push(`${order.row}:${order.seat}`);
      } else {
        session.taken.push(`${order.row}:${order.seat}`);
        sessions.set(`${order.film}:${order.session}`, session);
      }
    }

    // проверить, что во всех сеансах новые места в массиве taken не повторяются
    for (const [_, session] of sessions) {
      const set = new Set(session.taken);
      if (set.size !== session.taken.length) {
        throw new HttpException(`Невозможно забронировать места`, HttpStatus.BAD_REQUEST);
      }
    }
    
    // бронируем наконец-то
    for (const [key, session] of sessions) {
      const [ film, session_id ] = key.split(':');
      console.log(film, session_id, session.taken);
      await Film.updateOne(
        { id: film, 'schedule.id': session_id },
        { $set: { 'schedule.$.taken': session.taken } } 
      );
    }

    return orders;
  }
}