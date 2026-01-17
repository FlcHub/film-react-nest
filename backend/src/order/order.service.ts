import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FilmsMongoDbRepository } from '../repository/mongo.db.repository';
import { PostOrderDto } from './dto/order.dto';
import { GetScheduleDto } from '../films/dto/films.dto';

@Injectable()
export class OrderService {
  constructor(private filmsRepository: FilmsMongoDbRepository) {}

  async createOrder(postOrdersDto: PostOrderDto[]) {
    const sessions = new Map<string, GetScheduleDto>();

    // найти все сеансы и проверить доступность мест
    for (const order of postOrdersDto) {
      const session = await this.filmsRepository.findSession(
        order.film,
        order.session,
      );

      if (
        session.taken.find((el) => el === `${order.row}:${order.seat}`) ||
        order.row > session.rows ||
        order.seat > session.seats
      ) {
        throw new HttpException(
          `Невозможно забронировать место ${order.row}:${order.seat}`,
          HttpStatus.BAD_REQUEST,
        );
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
    for (const [, session] of sessions) {
      const set = new Set(session.taken);
      if (set.size !== session.taken.length) {
        throw new HttpException(
          `Невозможно забронировать места`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // бронируем наконец-то
    for (const [key, session] of sessions) {
      const [film] = key.split(':');
      await this.filmsRepository.updateSessionTaken(film, session);
    }

    return {
      total: postOrdersDto.length,
      items: postOrdersDto,
    };
  }
}
