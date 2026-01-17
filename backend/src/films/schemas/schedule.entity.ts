import { Film } from './film.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryColumn()
  id: number;
  
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
  taken: number;

  // каждому сеансу соответствует один фильм
  @ManyToOne(() => Film, film => film.schedules)
  @JoinColumn({ name: 'filmId' })
  film: Film;
}
