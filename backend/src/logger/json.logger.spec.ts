import { Test, TestingModule } from '@nestjs/testing';
import { JsonLogger } from './json.logger';

describe('UsersController', () => {
  let logger: JsonLogger;

  beforeEach(async () => {
    logger = new JsonLogger();
  });

  it('.get() should call UsersService.get', () => {
  });
});
