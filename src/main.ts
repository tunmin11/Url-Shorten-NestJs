import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { Public } from './modules/auth/decorators/public.decorator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Shorten URL Application')
  .setDescription('This App is build with NestJs for Shorten url.')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/doc', app, document);

  // Enable CORS 
  app.enableCors();

  app.useGlobalPipes( new ValidationPipe({ whitelist : true }) )
  await app.listen(process.env.PORT);
}
bootstrap();
