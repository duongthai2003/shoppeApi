import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import {
  DatabaseModule,
  MainDBModel,
} from 'src/libs/connections/database.module';
import { ProductController } from './product.controller';

@Module({
  imports: [DatabaseModule.mainDbModules([MainDBModel.Product])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
