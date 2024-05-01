import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    //IMPORTANTE: estas opciones convierten el limit y offset en números gracias
    //a las específicaciones hecha en los DTOs
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));

  await app.listen(3000);
}
bootstrap();
