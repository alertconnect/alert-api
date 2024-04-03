import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);

  // Swagger setup
  const options = new DocumentBuilder()
    .setTitle('AlertConnector API')
    .setDescription('Rest API for AlertConnector service')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  const appPort = configService.get<number>('APP_PORT', 3000);
  await app.listen(appPort);
}

bootstrap().then(() => {
  Logger.log('App running now!');
});
