import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Parallel Project 2020')
    .setDescription('Live API Documentation for parallel project, by Phatcharapon Jumruspun')
    .setVersion('1.0')
    .addTag('Clients')
    .addTag('Groups')
    .addTag('Messages')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'static'));
  await app.listen(3001);
}
bootstrap();