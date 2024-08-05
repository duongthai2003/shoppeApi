import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export function useSagger(app: NestExpressApplication, modules: any[]) {
  const config = new DocumentBuilder()
    .setTitle('Shoppe API')
    .setDescription('day laf trang quan ly api cua shoppep')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    include: modules,
    extraModels: [],
  };

  const document = SwaggerModule.createDocument(app, config, options);
  const swaggerCustomOptions = {};
  SwaggerModule.setup('api-Shoppee', app, document, swaggerCustomOptions);
}
