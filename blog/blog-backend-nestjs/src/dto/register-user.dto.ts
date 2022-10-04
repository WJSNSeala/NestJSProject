import { ApiProperty } from '@nestjs/swagger';

export default class RegisterUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
