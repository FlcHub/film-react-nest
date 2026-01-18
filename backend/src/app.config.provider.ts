import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    //прочесть переменнные среды
  },
};

export interface AppConfig {
}

export interface AppConfigDatabase {
}
