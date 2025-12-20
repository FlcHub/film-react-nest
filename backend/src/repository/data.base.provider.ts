import { AppConfig } from '../app.config.provider';
import { DatabaseConnection } from './data.base.connection';
import { FilmsMongoDbRepository } from './mongo.db.repository';

export const databaseProvider = {
  provide: 'DATABASE',
  useFactory: (config: AppConfig) => {
    const options = {
      url: config.database.url,
      driver: config.database.driver,
    }
    const connection = new DatabaseConnection(options);

    if (options.driver === 'mongodb') {
      return new FilmsMongoDbRepository(config);
    }
  },
  // можем указать зависимости, которые нужны для функции-фабрики
  inject: ['CONFIG']
}
