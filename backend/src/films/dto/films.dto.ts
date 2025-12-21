//TODO описать DTO для запросов к /films

export class GetScheduleDto {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[]; // { ${row}:${seat}, ... }
}

export class GetFilmDto {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: GetScheduleDto[];
}

export class GetFilmsDto {
  items: GetFilmDto[];
}

export class GetSchedulesDto {
  items: GetScheduleDto[];
}
