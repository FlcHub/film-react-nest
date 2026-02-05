import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: string, ...optionalParams: object[]) {
    // то, что будет выведено; сразу приписать уровень лога и дату
    const timestamp = new Date().toISOString();
    let logString = `level=${level}\ttimestamp=${timestamp}`;
    
    // записать message
    logString += `\tmessage=${message}`;

    // записать опциональные параметры
    optionalParams.forEach(el => {
      Object.entries(el).forEach(([key, value]) => {
        logString += `\tparam_${key}=${value}`;
      });
    });

    return logString;
  }
  
  /**
   * Write a 'log' level log.
   */
  log(message: string, ...optionalParams: object[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }
  
  /**
   * Write an 'error' level log.
   */
  error(message: string, ...optionalParams: object[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }
  
  /**
   * Write a 'warn' level log.
   */
  warn(message: string, ...optionalParams: object[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }
}
