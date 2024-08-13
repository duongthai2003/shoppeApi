import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useSagger } from './swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AuthModule } from './api/auth/auth.module';
import { userLogger } from 'logger';
import { UserModule } from './api/user/user.module';
import { CategoryModule } from './api/category/category.module';
import { json, raw, text, urlencoded } from 'body-parser';
import { ProductModule } from './api/product/product.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  if (process.env.ENABLE_SWAGGER) {
    useSagger(app, [AuthModule, UserModule, CategoryModule, ProductModule]);
  }

  userLogger(app);
  app.enableCors({});
  app.use(json({ limit: '10mb' }), urlencoded(), raw(), text());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
