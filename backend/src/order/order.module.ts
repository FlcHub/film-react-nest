import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { configProvider } from '../app.config.provider';
import { databaseProvider } from '../repository/data.base.provider';

@Module({
  controllers: [OrderController],
  providers: [configProvider, databaseProvider, OrderService],
})
export class OrderModule {}
