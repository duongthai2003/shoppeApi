import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useSagger } from './swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  if (process.env.ENABLE_SWAGGER) {
    useSagger(app, []);
  }

  console.log(process.env.MONGODB_MAIN_DB_PATH);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
