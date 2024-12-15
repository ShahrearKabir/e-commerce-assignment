import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe());

  // Enable versioning
  app
    .setGlobalPrefix('/api')
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
