import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './api/auth/auth.module';
import { DatabaseModule } from './libs/connections/database.module';
import { AuthController } from './api/auth/auth.controller';
import { UserModule } from './api/user/user.module';
import { CategoryModule } from './api/category/category.module';
import { ProductModule } from './api/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot('mongodb://localhost:27017'),
    DatabaseModule.mainDb(),
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
  ],

  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
