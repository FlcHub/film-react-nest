import { AppConfig } from '../app.config.provider';
import { FilmsRepository } from './films.repository';
import { FilmsMongoDbRepository } from './mongo.db.repository';

export const databaseProvider = {
  provide: FilmsRepository,
  useFactory: (config: AppConfig, mongooseRepository: FilmsMongoDbRepository) => {
    const options = {
      url: config.database.url,
      driver: config.database.driver,
    };

    if (options.driver === 'mongodb') {
      return mongooseRepository;
    }
  },
  // указать зависимости, которые нужны для функции-фабрики
  inject: ['CONFIG', FilmsMongoDbRepository],
};
