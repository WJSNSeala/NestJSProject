import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import CreateUserDto from '../dto/create-user.dto';
import GetUserDto from '../dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUserByName(username: string) {
    const user: User = await this.usersRepository.findOne({
      where: { username },
    });
    return user;
  }
  async create(userData: CreateUserDto) {
    // 데이터 주고받기는 Dto
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
