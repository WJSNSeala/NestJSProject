import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Req,
  Res,
  HttpCode,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import RegisterUserDto from 'src/dto/register-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/auth')
@ApiTags('User Authentication API')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'make user by username/password',
    description: '유저 회원가입',
  })
  @Post('register')
  async register(@Body() registrationData: RegisterUserDto) {
    return this.authService.register(registrationData);
  }

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'login by username/password',
    description:
      '유저 정보를 통해 로그인, localguard 기반 검증, 로그인 성공시 access_token에 jwt저장',
  })
  async login(@Body() body, @Res({ passthrough: true }) response) {
    const { user, token } = await this.authService.login(body.username);
    response.cookie('access_token', token, { httpOnly: true });
    delete user.password;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  @ApiOperation({
    summary: 'check user login state',
    description:
      '현재 사용자가 로그인 중인지 access_token기반 검증, 성공시 현재 로그인중인 username 반환',
  })
  check(@Req() req) {
    return req.user;
  }

  @HttpCode(204)
  @Post('logout')
  @ApiOperation({
    summary: 'logout',
    description: '쿠키 정보 초기화를 통한 로그아웃',
  })
  attachCookie(@Res({ passthrough: true }) response) {
    response.cookie('access_token');
  }
}
