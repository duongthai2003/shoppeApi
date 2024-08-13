import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {
  DatabaseModule,
  MainDBModel,
} from 'src/libs/connections/database.module';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule.mainDbModules([MainDBModel.User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
