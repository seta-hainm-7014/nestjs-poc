import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable()
export class HttpClientService {
  private readonly logger = new Logger(HttpClientService.name);
  private readonly serviceBUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.serviceBUrl = this.configService.get<string>('services.serviceB.url') || '';
    if (!this.serviceBUrl) {
      this.logger.warn('Service B URL is not configured properly');
    }
  }

  async get<T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> {
    const url = this.buildUrl(endpoint);
    this.logger.log(`Making GET request to ${url}`);
    
    try {
      const response = await firstValueFrom(
        this.httpService.get<T>(url, options).pipe(
          catchError((error) => {
            this.logger.error(`Error making GET request to ${url}: ${error.message}`);
            return throwError(() => error);
          }),
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Failed GET request to ${url}`);
      throw error;
    }
  }

  async post<T, D>(endpoint: string, data: D, options?: AxiosRequestConfig): Promise<T> {
    const url = this.buildUrl(endpoint);
    this.logger.log(`Making POST request to ${url}`);
    
    try {
      const response = await firstValueFrom(
        this.httpService.post<T>(url, data, options).pipe(
          catchError((error) => {
            this.logger.error(`Error making POST request to ${url}: ${error.message}`);
            return throwError(() => error);
          }),
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Failed POST request to ${url}`);
      throw error;
    }
  }

  async put<T, D>(endpoint: string, data: D, options?: AxiosRequestConfig): Promise<T> {
    const url = this.buildUrl(endpoint);
    this.logger.log(`Making PUT request to ${url}`);
    
    try {
      const response = await firstValueFrom(
        this.httpService.put<T>(url, data, options).pipe(
          catchError((error) => {
            this.logger.error(`Error making PUT request to ${url}: ${error.message}`);
            return throwError(() => error);
          }),
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Failed PUT request to ${url}`);
      throw error;
    }
  }

  async delete<T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> {
    const url = this.buildUrl(endpoint);
    this.logger.log(`Making DELETE request to ${url}`);
    
    try {
      const response = await firstValueFrom(
        this.httpService.delete<T>(url, options).pipe(
          catchError((error) => {
            this.logger.error(`Error making DELETE request to ${url}: ${error.message}`);
            return throwError(() => error);
          }),
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Failed DELETE request to ${url}`);
      throw error;
    }
  }

  private buildUrl(endpoint: string): string {
    if (!this.serviceBUrl) {
      throw new Error('Service B URL is not configured');
    }
    
    // Remove leading slash from endpoint if present
    const formattedEndpoint = endpoint.startsWith('/') 
      ? endpoint.substring(1) 
      : endpoint;
    
    // Ensure service URL has a trailing slash if needed
    const baseUrl = this.serviceBUrl.endsWith('/') 
      ? this.serviceBUrl 
      : `${this.serviceBUrl}/`;
    
    return `${baseUrl}${formattedEndpoint}`;
  }
}
