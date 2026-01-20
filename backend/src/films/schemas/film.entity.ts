import { GetFilmDto } from '../dto/films.dto';
import { getScheduleMapperFn, Schedule } from './schedule.entity';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity('films')
export class Film {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'double precision' })
  rating: number;

  @Column({ type: 'varchar' })
  director: string;

  @Column({ type: 'text' })
  tags: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar' })
  cover: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  about: string;

  @Column({ type: 'varchar' })
  description: string;

  // каждому фильму соответствует несколько сеансов
  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedule: Schedule[];
}

export function getFilmMapperFn(): (film: Film) => GetFilmDto {
  return (film) => {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags ? film.tags.split(',') : [],
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: film.schedule
        .map(getScheduleMapperFn())
        .sort((a, b) => a.daytime.getTime() - b.daytime.getTime()),
    };
  };
}
