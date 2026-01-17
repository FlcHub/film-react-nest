import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private filmsRepository: FilmsRepository) {}

  async findAll() {
    return await this.filmsRepository.findAll();
  }

  async findOne(id: string) {
    return await this.filmsRepository.findOne(id);
  }
}
