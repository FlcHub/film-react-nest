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

  @Column({
    type: process.env.DATABASE_DRIVER === 'mongodb' ? 'array' : 'text',
    array: process.env.DATABASE_DRIVER === 'mongodb' ? true : false,
  })
  taken: string[];

  // каждому сеансу соответствует один фильм
  @ManyToOne(() => Film, film => film.schedule)
  @JoinColumn({ name: 'filmId' })
  film: Film;
}
