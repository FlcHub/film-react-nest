//TODO описать DTO для запросов к /films

export class GetScheduleDto {
  
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
  //schedule: GetScheduleDTO[];
} 

export class GetFilmsDto {
  films: GetFilmDto[];
}
