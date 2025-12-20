import { GetFilmDto, GetFilmsDto } from '../films/dto/films.dto';

export interface FilmsRepository {
  findAll(): Promise<GetFilmsDto>;
  findOne(id: string): Promise<GetFilmDto>;
}