import { PostOrderDto } from '../order/dto/order.dto';
import { GetFilmDto, GetFilmsDto, GetSchedulesDto } from '../films/dto/films.dto';

export interface FilmsRepository {
  findAll(): Promise<GetFilmsDto>;
  findOne(id: string): Promise<GetSchedulesDto>;
  createOrder(orders: PostOrderDto[]): Promise<PostOrderDto[]>;
}