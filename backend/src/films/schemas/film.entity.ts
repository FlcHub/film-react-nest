import { Schedule } from './schedule.entity';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

@Entity('films')
export class Film {
  @PrimaryColumn()
  id: string;
  
  @Column({ type: 'double precision' })
  rating: number;

  @Column({ type: 'varchar' })
  director: string;

  @Column({
    type: process.env.DATABASE_DRIVER === 'mongodb' ? 'array' : 'text',
    array: process.env.DATABASE_DRIVER === 'mongodb' ? true : false,
  })
  tags: string[];

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
  @OneToMany(() => Schedule, schedule => schedule.film)
  schedule: Schedule[];
}
