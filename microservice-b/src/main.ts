import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Configure Kafka consumer
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: configService.get('kafka.clientId'),
        brokers: configService.get<string[]>('kafka.brokers') || [],
      },
      consumer: {
        groupId: configService.get('kafka.groupId') || 'default-group-id',
      },
    },
  });

  // Start Kafka consumer
  await app.startAllMicroservices();
  logger.log('Kafka consumer microservice is listening');

  // Start HTTP server
  await app.listen(process.env.PORT ?? 3031);
  logger.log(`HTTP server is running on port ${process.env.PORT ?? 3031}`);
}
bootstrap();
