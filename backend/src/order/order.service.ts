import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  createOrder() {
    return `This action creates an order`;
  }
}
