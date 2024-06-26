import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Desafio Khipo - Documentação')
    .setDescription(
      'Documentação da aplicação desenvolvida no desafio de Nodejs da Khipo. Aplicação e documentação feita por Matheus Castilho.',
    )
    .setVersion('1.0')
    .addTag('users')
    .addTag('projects')
    .addTag('tags')
    .addTag('tasks')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
