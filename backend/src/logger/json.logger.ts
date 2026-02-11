import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  formatMessage(level: string, message: string, ...optionalParams: any[]) {
    return JSON.stringify({ level, message, optionalParams });
  }

  /**
   * Write a 'log' level log.
   */
  log(message: string, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  /**
   * Write an 'error' level log.
   */
  error(message: string, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: string, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }
}
