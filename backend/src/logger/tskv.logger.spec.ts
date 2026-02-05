import { Test, TestingModule } from '@nestjs/testing';
import { TskvLogger } from './tskv.logger';

describe('UsersController', () => {
  let logger: TskvLogger;

  beforeEach(async () => {
    logger = new TskvLogger();
  });

  it('.get() should call UsersService.get', () => {
  });
});
