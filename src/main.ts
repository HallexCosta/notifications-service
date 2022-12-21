import { KafkaConsumerService } from '@infra/messaging/kafka/kafka-consumer.service'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions } from '@nestjs/microservices'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  // kafka consumer
  const kafkaConsumerService = app.get(KafkaConsumerService)
  app.connectMicroservice<MicroserviceOptions>({
    strategy: kafkaConsumerService
  })
  await app.startAllMicroservices()

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Notifications Service')
    .setDescription('The expert notifications microservice')
    .setVersion('1.0')
    .addTag('notifications')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000)
}
bootstrap()
