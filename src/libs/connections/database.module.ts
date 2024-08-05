import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DB } from './db';

export { InjectModel } from '@nestjs/mongoose';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule extends DB {}
