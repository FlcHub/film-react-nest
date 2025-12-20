import mongoose, { Mongoose } from 'mongoose';

export class DatabaseConnection {
  constructor(private options: { url: string; driver: string }) {
    this.connect();
  }

  private async connect() {
    if (this.options.driver === 'mongodb') {
      await mongoose.connect(this.options.url);
    } else {
      console.log(`База данных ${this.options.driver} не поддерживается!`);
    }
  }
}