import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { FilmsMongoDbModule } from '../repository/mongo.db.module';

@Module({
  imports: [FilmsMongoDbModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
