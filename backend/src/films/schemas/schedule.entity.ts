import { GetScheduleDto } from '../dto/films.dto';
import { Film } from './film.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity('schedules')
export class Schedule {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar' })
  daytime: string;

  @Column({ type: 'integer' })
  hall: number;

  @Column({ type: 'integer' })
  rows: number;

  @Column({ type: 'integer' })
  seats: number;

  @Column({ type: 'double precision' })
  price: number;

  @Column({ type: 'text' })
  taken: string;

  // каждому сеансу соответствует один фильм
  @ManyToOne(() => Film, (film) => film.schedule)
  @JoinColumn({ name: 'filmId' })
  film: Film;
}

export function getScheduleMapperFn(): (schedule: Schedule) => GetScheduleDto {
  return (schedule) => {
    return {
      id: schedule.id,
      daytime: new Date(schedule.daytime),
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken ? schedule.taken.split(',') : [],
    };
  };
}
