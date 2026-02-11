import { JsonLogger } from './json.logger';

describe('JsonLogger: function calls', () => {
  let logger: JsonLogger;

  let spyLog: jest.SpyInstance;
  let spyWarn: jest.SpyInstance;
  let spyError: jest.SpyInstance;

  beforeEach(async () => {
    spyLog = jest.spyOn(console, 'log');
    spyWarn = jest.spyOn(console, 'warn');
    spyError = jest.spyOn(console, 'error');

    logger = new JsonLogger();

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

  const haveBeenCalledTimes = (
    logTimes: number,
    warnTimes: number,
    errorTimes: number,
  ) => {
    expect(console.log).toHaveBeenCalledTimes(logTimes);
    expect(console.warn).toHaveBeenCalledTimes(warnTimes);
    expect(console.error).toHaveBeenCalledTimes(errorTimes);
  };

  it('should call console.log', () => {
    const message = 'someLog';

    logger.log(message);

    haveBeenCalledTimes(1, 0, 0);
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining(message));
  });

  it('should call console.warn', () => {
    const message = 'someWarning';

    logger.warn(message);

    haveBeenCalledTimes(0, 1, 0);
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining(message));
  });

  it('should call console.error', () => {
    const message = 'someError';

    logger.error(message);

    haveBeenCalledTimes(0, 0, 1);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining(message),
    );
  });
});

describe('JsonLogger: format messages', () => {
  let logger: JsonLogger;

  beforeEach(async () => {
    logger = new JsonLogger();
  });

  it('should create a correctly formated message (without optionalParams)', () => {
    const message = 'message';
    const expectMessage = {
      level: 'log',
      message: 'message',
      optionalParams: [],
    };

    const formatedMessage = logger.formatMessage('log', message);
    const parsedMessage = JSON.parse(formatedMessage);

    expect(parsedMessage).toEqual(expectMessage);
  });

  it('should create a correctly formated message (with optionalParams)', () => {
    const message = 'message';
    const expectMessage = {
      level: 'log',
      message: 'message',
      optionalParams: [{ key1: 'value1' }, { key2: 'value2' }],
    };

    const formatedMessage = logger.formatMessage(
      'log',
      message,
      { key1: 'value1' },
      { key2: 'value2' },
    );
    const parsedMessage = JSON.parse(formatedMessage);

    expect(parsedMessage).toEqual(expectMessage);
  });
});
