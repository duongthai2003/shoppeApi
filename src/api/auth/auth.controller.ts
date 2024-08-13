import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './Dto/register.dto';
import { LoginDto } from './Dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import * as _ from 'lodash';

@ApiTags('auth Management')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'login' })
  @UseGuards(AuthGuard('local'))
  login(@Req() req, @Body() body: LoginDto) {
    return this.authService.login(req.user);
  }

  @Get('me')
  @ApiOperation({
    summary: 'get current user login',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getcurrent(@Req() req) {
    return _.pick(req.user, [
      '_id',
      'firstName',
      'lastName',
      'userName',
      'email',
      'fullName',
      'type',
      'createdAt',
      'updatedAt',
    ]);
  }

  @Post('')
  @ApiOperation({ summary: 'register' })
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
