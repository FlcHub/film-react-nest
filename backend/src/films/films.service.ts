import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../repository/database.repository';

@Injectable()
export class FilmsService {
  constructor(private filmsRepository: DatabaseRepository) {}

  async findAll() {
    return await this.filmsRepository.findAll();
  }

  async findOne(id: string) {
    return await this.filmsRepository.findOne(id);
  }
}
