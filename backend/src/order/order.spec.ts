import { Test } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PostOrderDto, PostOrdersDto } from './dto/order.dto';
import { DatabaseRepository } from '../repository/database.repository';
import { GetScheduleDto } from '../films/dto/films.dto';
import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';

const mockOrder: PostOrderDto = {
  film: '',
  session: '',
  daytime: '',
  row: 1,
  seat: 1,
  price: 0,
};

const mockSchedule: GetScheduleDto = {
  id: '',
  daytime: new Date(),
  hall: 1,
  rows: 10,
  seats: 10,
  price: 0,
  taken: [],
};

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  let app: INestApplication;

  const mockDatabaseRepository = {
    findSession: jest.fn(),
    updateSessionTaken: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: DatabaseRepository,
          useValue: mockDatabaseRepository,
        },
      ],
    }).compile();

    controller = moduleRef.get<OrderController>(OrderController);
    service = moduleRef.get<OrderService>(OrderService);

    app = moduleRef.createNestApplication();
    await app.init();

    jest.spyOn(service, 'createOrder');
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  it('should call service.createOrder', () => {
    const thisOrder: PostOrderDto = { ...mockOrder, seat: 1, row: 1 };
    const thisSchedule: GetScheduleDto = { ...mockSchedule, taken: [] };

    mockDatabaseRepository.findSession.mockReturnValue(thisSchedule);

    const orders: PostOrdersDto = {
      tickets: [thisOrder],
    };

    controller.createOrder(orders);
    expect(service.createOrder).toHaveBeenCalledWith(orders.tickets);
  });

  it('should return created orders', async () => {
    const thisOrder: PostOrderDto = { ...mockOrder, seat: 1, row: 1 };
    const thisSchedule: GetScheduleDto = { ...mockSchedule, taken: [] };

    mockDatabaseRepository.findSession.mockReturnValue(thisSchedule);

    const orders: PostOrdersDto = {
      tickets: [thisOrder],
    };

    const expectedResult = {
      total: orders.tickets.length,
      items: orders.tickets,
    };

    const result = await service.createOrder(orders.tickets);
    expect(result).toEqual(expectedResult);
  });

  it('should throw HttpException for repeating orders', async () => {
    const thisOrder: PostOrderDto = { ...mockOrder, seat: 1, row: 1 };

    // БД в ходе проверок на свободное место в service не меняется,
    // поэтому и возвращать на оба вызова должна одно и то же значение,
    // а не модифицированное (service модифицирует возвращаемое значение, но не саму БД...)
    mockDatabaseRepository.findSession
      .mockReturnValue({ ...mockSchedule, taken: [] })
      .mockReturnValueOnce({ ...mockSchedule, taken: [] });

    const orders: PostOrdersDto = {
      tickets: [thisOrder, thisOrder],
    };

    await expect(service.createOrder(orders.tickets)).rejects.toThrow(
      new HttpException(
        'Невозможно забронировать места',
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('should throw HttpException for ordering a taken seat', async () => {
    const thisOrder: PostOrderDto = { ...mockOrder, seat: 1, row: 1 };
    const thisSchedule: GetScheduleDto = { ...mockSchedule, taken: ['1:1'] };

    mockDatabaseRepository.findSession.mockReturnValue(thisSchedule);

    const orders: PostOrdersDto = {
      tickets: [thisOrder],
    };

    await expect(service.createOrder(orders.tickets)).rejects.toThrow(
      new HttpException(
        'Невозможно забронировать место 1:1',
        HttpStatus.BAD_REQUEST,
      ),
    );
  });
});
