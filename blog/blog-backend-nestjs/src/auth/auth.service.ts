import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import RegisterUserDto from 'src/dto/register-user.dto';
import GetUserDto from '../dto/get-user.dto';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async register(registrationData: RegisterUserDto) {
    const hashedPassword = await hash(registrationData.password, 10);

    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        // 사용자 중복 시 postgres error
        throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'unknown error occured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateUser(username: string, hashedPassword: string): Promise<any> {
    try {
      const user = await this.usersService.getUserByName(username);
      const isPasswordMatching = await compare(hashedPassword, user.password);

      if (!isPasswordMatching) {
        return null;
      }
      return user;
    } catch (error) {
      throw new HttpException('wrong user info', HttpStatus.BAD_REQUEST);
    }
  }

  async login(username: string) {
    const user: GetUserDto = await this.usersService.getUserByName(username);
    const token = this.getCookieWithJwt(user.id, username);
    return { user, token };
  }

  public getCookieWithJwt(userId: number, username: string) {
    const payload = { userId, username };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
