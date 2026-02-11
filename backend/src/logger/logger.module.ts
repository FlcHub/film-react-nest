import { Module, LoggerService } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';
import { DevLogger } from './dev.logger';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'LOGGER_SERVICE',
      useFactory: (configService: ConfigService): LoggerService => {
        const loggerType = configService.get<string>('LOGGER_TYPE', 'json');

        if (loggerType === 'dev') {
          return new DevLogger();
        }

        if (loggerType === 'tskv') {
          return new TskvLogger();
        }

        return new JsonLogger();
      },
      inject: [ConfigService],
    },
  ],
  exports: ['LOGGER_SERVICE'],
})
export class LoggerModule {}
