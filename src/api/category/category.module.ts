import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  DatabaseModule,
  MainDBModel,
} from 'src/libs/connections/database.module';
import { CategoryController } from './category.controller';

@Module({
  imports: [DatabaseModule.mainDbModules([MainDBModel.Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
