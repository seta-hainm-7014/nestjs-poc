import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';

@Controller()
export class KafkaController {
  private readonly logger = new Logger(KafkaController.name);

  @MessagePattern('service-b-topic', Transport.KAFKA)
  async handleMessage(@Payload() message: any) {
    this.logger.log(`Received message from Kafka: ${message}`);
    
    // Process the message
    const parsedMessage = typeof message.value === 'string' 
      ? JSON.parse(message.value) 
      : message.value;
    
    this.logger.log(`Processed message from Service A: ${JSON.stringify(message)}`);
    
    // Return a response (this will not be sent back to the producer directly)
    return {
      status: 'processed',
      receivedFrom: 'Service A',
      processedAt: new Date().toISOString(),
    };
  }
}
