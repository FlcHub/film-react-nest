import { Test, TestingModule } from '@nestjs/testing';
import { TskvLogger } from './tskv.logger';

describe('TskvLogger: function calls', () => {
  let logger: TskvLogger;

  let spyLog: jest.SpyInstance;
  let spyWarn: jest.SpyInstance;
  let spyError: jest.SpyInstance;
  
  // логгер использует Date().toISOString(), можно замокировать его, чтобы не мешало проверке формата лога
  let spyDate: jest.SpyInstance;

  beforeAll(async () => {
    spyDate = jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('timestamp');
  });

  afterAll(async () => {
    spyDate.mockRestore();
  });
  
  beforeEach(async () => {
    logger = new TskvLogger();

    spyLog = jest.spyOn(console, 'log');
    spyWarn = jest.spyOn(console, 'warn');
    spyError = jest.spyOn(console, 'error');

    // переопределить вывод в консоль, чтобы не спамить лишнего во время тестов
    spyLog.mockImplementation(() => 'fn() log: mocked implementation');
    spyWarn.mockImplementation(() => 'fn() warn: mocked implementation');
    spyError.mockImplementation(() => 'fn() error: mocked implementation');
  });

  afterEach(async () => {
    spyLog.mockRestore();
    spyWarn.mockRestore();
    spyError.mockRestore();
  });

  const haveBeenCalledTimes = (logTimes: number, warnTimes: number, errorTimes: number) => {
    expect(console.log).toHaveBeenCalledTimes(logTimes);
    expect(console.warn).toHaveBeenCalledTimes(warnTimes);
    expect(console.error).toHaveBeenCalledTimes(errorTimes);
  };

  it('should call console.log with a formated message', () => {
    const message = 'someLog';

    logger.log(message);

    haveBeenCalledTimes(1, 0, 0);
    expect(console.log).toHaveBeenCalledWith(logger.formatMessage('log', message));
  });

  it('should call console.warn with a formated message', () => {
    const message = 'someWarning';
    
    logger.warn(message);

    haveBeenCalledTimes(0, 1, 0);
    expect(console.warn).toHaveBeenCalledWith(logger.formatMessage('warn', message));
  });

  it('should call console.error with a formated message', () => {
    const message = 'someError';
    
    logger.error(message);

    haveBeenCalledTimes(0, 0, 1);
    expect(console.error).toHaveBeenCalledWith(logger.formatMessage('error', message));
  });
});

describe('TskvLogger: format messages', () => {
  let logger: TskvLogger;

  // логгер использует Date().toISOString(), можно замокировать его, чтобы не мешало проверке формата лога
  let spyDate: jest.SpyInstance;

  beforeAll(async () => {
    spyDate = jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('timestamp');
  });

  afterAll(async () => {
    spyDate.mockRestore();
  });

  beforeEach(async () => {
    logger = new TskvLogger();
  });
  
  it('should create a correctly formated message (without optionalParams)', () => {
    const message = 'message';
    const expectMessage = 'level=log\ttimestamp=timestamp\tmessage=message';

    const formatedMessage = logger.formatMessage('log', message);
    expect(formatedMessage).toEqual(expectMessage);
  });

  it('should create a correctly formated message (with optionalParams)', () => {
    const message = 'message';
    const expectMessage = 'level=log\ttimestamp=timestamp\tmessage=message\tparam_key1=value1\tparam_key2=value2';

    const formatedMessage = logger.formatMessage('log', message,
      { key1: 'value1' }, { key2: 'value2' });
    expect(formatedMessage).toEqual(expectMessage);
  });
});
