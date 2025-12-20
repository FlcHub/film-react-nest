import { Inject, Injectable } from '@nestjs/common';
import { AppConfig } from '../app.config.provider';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('CONFIG') private config: AppConfig,
    @Inject('DATABASE') private filmsRepository: FilmsRepository,
  ) {}

  async findAll() {
    return await this.filmsRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} film`;
  }
}
