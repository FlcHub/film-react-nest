import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { FilmsDatabaseModule } from '../repository/database.module';

@Module({
  imports: [FilmsDatabaseModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
