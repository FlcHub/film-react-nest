import {
  GetFilmsDto,
  GetScheduleDto,
  GetSchedulesDto,
} from '../films/dto/films.dto';

export abstract class FilmsRepository {
  abstract findAll(): Promise<GetFilmsDto>;

  abstract findOne(id: string): Promise<GetSchedulesDto>;

  abstract findSession(
    film_id: string,
    session_id: string,
  ): Promise<GetScheduleDto>;
  
  abstract updateSessionTaken(
    film_id: string,
    schedule: GetScheduleDto,
  ): Promise<boolean>;
}
