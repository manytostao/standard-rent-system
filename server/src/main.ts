import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Bootstraping of the NestJS application
 */
async function bootstrap() {

  /* create the nestjs app */
  const app = await NestFactory.create(AppModule);

  /* enable communication between different domains */
  app.enableCors();

  /* start the expressjs server on port 3000 */
  await app.listen(3000);
}

bootstrap();
