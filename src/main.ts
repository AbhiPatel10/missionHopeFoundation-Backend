import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    origin: ['http://localhost:3000', 'https://missionhopefoundation.in'], // Allow all origins (you can specify specific domains if needed)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
