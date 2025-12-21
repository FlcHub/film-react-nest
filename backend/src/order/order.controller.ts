import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { PostOrderDto, PostOrdersDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() postOrdersDto: PostOrdersDto) {
    return this.orderService.createOrder(postOrdersDto.tickets);
  }
}
