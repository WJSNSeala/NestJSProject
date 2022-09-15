import { Request } from 'express';
import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/db-host-from-config')
  getDatabaseHostFromConfigService(): string {
    return this.configService.get('DATABASE_HOST');
  }

  @Get()
  getHello(): string {
    console.log(process.env.DATABAST_HOST);
    console.log(process.env.NODE_ENV);
    return process.env.DATABASE_HOST;
  }
}
