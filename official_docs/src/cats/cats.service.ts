import { Injectable } from '@nestjs/common';
<<<<<<< HEAD
import { Cat } from './cats.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

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
=======

@Injectable()
export class CatsService {}
>>>>>>> e8039b035461638d1bf70e0564e80ce31f5e0446
