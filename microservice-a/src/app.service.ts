import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger(AppService.name);

  async getDataFromB(): Promise<any> {
    Logger.log('Calling microservice B');
    const response = await firstValueFrom(
      this.httpService.get('http://localhost:3031/api/poc/rest'),
    );
    return { source: 'microservice A', data: response.data };
  }
}
