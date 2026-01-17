import { Schedule } from './schedule.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'double precision' })
  rating: string;

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
  @OneToMany(() => Schedule, schedule => schedule.film)
  schedules: Schedule[];
}
