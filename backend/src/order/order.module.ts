import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { configProvider } from '../app.config.provider';
import { databaseProvider } from '../repository/data.base.provider';
import { FilmsMongoDbModule } from '../repository/mongo.db.module';

@Module({
  imports: [FilmsMongoDbModule],
  controllers: [OrderController],
  providers: [configProvider, databaseProvider, OrderService],
})
export class OrderModule {}
