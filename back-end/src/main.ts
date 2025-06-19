import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,  // O específicamente 'http://localhost:4200'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Importante para withCredentials
    allowedHeaders: ['Content-Type', 'authorization'],
    exposedHeaders: ['authorization']
  });

  const config = new DocumentBuilder()
    .setTitle('Alumnos API')
    .setDescription('API para manejar alumnos')
    .setVersion('1.0')
    .addTag('alumnos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();