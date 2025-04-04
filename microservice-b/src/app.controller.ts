import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from '@nestjs/common';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("api/poc/rest")
  getRest(): object {
    this.logger.log("Processing REST request in microservice B");
    return { message: "Hello, this is a response fronm service B" };
  }
}
