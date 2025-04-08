import { Module } from '@nestjs/common';
import { KafkaPublisherService } from './kafka-publisher.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [KafkaPublisherService],
  exports: [KafkaPublisherService],
})
export class KafkaModule {}
