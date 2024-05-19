import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { TransformInterceptor } from './common/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new TransformInterceptor());

  app.use(cookieParser());

  await app.listen(8000);
}
bootstrap();
