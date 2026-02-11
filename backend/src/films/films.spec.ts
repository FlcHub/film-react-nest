import { Test } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import {
  GetFilmDto,
  GetFilmsDto,
  GetScheduleDto,
  GetSchedulesDto,
} from './dto/films.dto';
import { DatabaseRepository } from '../repository/database.repository';

const schedule: GetScheduleDto = {
  id: '',
  daytime: new Date(),
  hall: 1,
  rows: 10,
  seats: 10,
  price: 0,
  taken: [],
};

const film: GetFilmDto = {
  id: '',
  rating: 1,
  director: '',
  tags: [],
  image: '',
  cover: '',
  title: '',
  about: '',
  description: '',
  schedule: [schedule],
};

const mockAllFilms: GetFilmsDto = {
  total: 1,
  items: [film],
};

const mockOneSchedule: GetSchedulesDto = {
  total: 1,
  items: [schedule],
};

describe('OrderController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockDatabaseRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        FilmsService,
        {
          provide: DatabaseRepository,
          useValue: mockDatabaseRepository,
        },
      ],
    }).compile();

    controller = moduleRef.get<FilmsController>(FilmsController);
    service = moduleRef.get<FilmsService>(FilmsService);

    mockDatabaseRepository.findAll.mockReturnValue(mockAllFilms);
    mockDatabaseRepository.findOne.mockReturnValue(mockOneSchedule);

    jest.spyOn(service, 'findOne');
    jest.spyOn(service, 'findAll');
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should call service.findAll', async () => {
    await controller.findAll();

    expect(service.findAll).toHaveBeenCalledTimes(1);
  });

  it('should call service.findOne', async () => {
    const id = '';

    await controller.findOne(id);

    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should return all films', async () => {
    await expect(service.findAll()).resolves.toEqual(mockAllFilms);
  });

  it('should return a schedule for one film', async () => {
    await expect(service.findOne('')).resolves.toEqual(mockOneSchedule);
  });
});
