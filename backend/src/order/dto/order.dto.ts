//TODO реализовать DTO для /orders
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PostOrderDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsString()
  daytime: string;

  @IsInt()
  row: number;

  @IsInt()
  seat: number;

  @IsNumber()
  @IsPositive()
  price: number;
}

export class PostOrdersDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PostOrderDto)
  tickets: PostOrderDto[];
}

export class PostOrdersResDto {
  @IsNumber()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PostOrderDto)
  items: PostOrderDto[];
}
