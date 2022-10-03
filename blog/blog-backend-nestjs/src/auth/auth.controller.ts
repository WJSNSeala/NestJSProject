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

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('test')
  getHello() {
    return 'hi';
  }

  @Post('register')
  async register(@Body() registrationData: RegisterUserDto) {
    return this.authService.register(registrationData);
  }

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body, @Res({ passthrough: true }) response) {
    const { user, token } = await this.authService.login(body.username);
    response.cookie('access_token', token, { httpOnly: true });
    delete user.password;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  check(@Req() req) {
    return req.user;
  }

  @HttpCode(204)
  @Post('logout')
  attachCookie(@Res({ passthrough: true }) response) {
    response.cookie('access_token');
  }
}
