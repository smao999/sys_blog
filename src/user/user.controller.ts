import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/add-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() register: RegisterUserDto) {
    return this.userService.register(register);
  }

  @Post('login')
  async login(@Body() login: LoginUserDto) {
    return this.userService.login(login);
  }

  @Get('refresh')
  async refresh(@Query('refreshToken') refreshToken: string) {
    return this.userService.refresh(refreshToken);
  }
}
