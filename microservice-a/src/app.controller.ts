import { Controller, Get, Logger, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpClientService } from './common/http/http-client.service';
import { KafkaPublisherService } from './kafka/kafka-publisher.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly httpClientService: HttpClientService,
    private readonly kafkaPublisherService: KafkaPublisherService,
  ) {}
  

  @Get('call-service-b')
  async callServiceB() {
    this.logger.log('Calling Service B from Service A');
    try {
      const response = await this.httpClientService.get<{ message: string }>('api/poc/rest');
      return {
        status: 'success',
        data: response,
        source: 'Service A',
      };
    } catch (error) {
      this.logger.error('Error calling Service B', error);
      return {
        status: 'error',
        message: 'Failed to call Service B',
        source: 'Service A',
      };
    }
  }

  @Post('send-message-to-b')
  async sendMessageToB(@Body() message: any) {
    this.logger.log('Sending Kafka message to Service B');
    try {
      await this.kafkaPublisherService.publishMessage('service-b-topic', {
        data: message,
        timestamp: new Date().toISOString(),
        source: 'Service A'
      });
      
      return {
        status: 'success',
        message: 'Message sent to Service B via Kafka',
      };
    } catch (error) {
      this.logger.error('Error sending Kafka message to Service B', error);
      return {
        status: 'error',
        message: 'Failed to send Kafka message to Service B',
      };
    }
  }
}
