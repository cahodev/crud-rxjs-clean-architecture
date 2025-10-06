import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import loadSecretConfig from './shared/infrastructure/config/secret.config'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const secretConfig = await loadSecretConfig();
  const app = await NestFactory.create(AppModule.forRoot({secretConfig}));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
