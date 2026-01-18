import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { FilmsDatabaseModule } from '../repository/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FilmsDatabaseModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
