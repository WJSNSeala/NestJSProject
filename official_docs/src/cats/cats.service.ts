import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Cat } from './cats.interface';

@Injectable()
export class CatsService implements OnModuleInit, OnApplicationShutdown {
  private readonly cats: Cat[] = [];

  onModuleInit(): any {
    console.log('user service initialized');
  }

  onApplicationShutdown(signal?: string): any {
    console.log('RECEIVED SIGNAL : ', signal);
  }

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number) {
    return `id ${id}`;
  }
}
