import { Inject, Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { PostOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('DATABASE') private filmsRepository: FilmsRepository,
  ) {}

  createOrder(postOrdersDto: PostOrderDto[]) {
    return this.filmsRepository.createOrder(postOrdersDto);
  }
}
