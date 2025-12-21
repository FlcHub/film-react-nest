//TODO описать DTO для запросов к /films
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class GetScheduleDto {
  @IsString()
  id: string;

  @IsDate()
  @Type(() => Date)
  daytime: Date;

  @IsInt()
  hall: number;

  @IsInt()
  rows: number;

  @IsInt()
  seats: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsArray()
  @IsString({ each: true })
  taken: string[]; // { ${row}:${seat}, ... }
}

export class GetFilmDto {
  @IsString()
  id: string;

  @IsNumber()
  @IsPositive()
  rating: number;

  @IsString()
  director: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  image: string;

  @IsString()
  cover: string;

  @IsString()
  title: string;

  @IsString()
  about: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetScheduleDto)
  schedule: GetScheduleDto[];
}

export class GetFilmsDto {
  @IsInt()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetFilmDto)
  items: GetFilmDto[];
}

export class GetSchedulesDto {
  @IsInt()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetScheduleDto)
  items: GetScheduleDto[];
}
