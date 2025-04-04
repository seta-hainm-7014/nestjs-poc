import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpClientService } from './common/http/http-client.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly httpClientService: HttpClientService,
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
}
