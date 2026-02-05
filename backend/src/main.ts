import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  app.useLogger(app.get<LoggerService>('LOGGER_SERVICE'));
  await app.listen(3000);
}
bootstrap();
