import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { User } from './users/user.entity';

/**
 * Server's primary api endpoints
 */
@Controller('api')
export class AppController {

  /**
   * Controller constructor
   * @param authService Instance of AuthService
   */
  constructor(private readonly authService: AuthService) {
  }

  /**
   * Registration api endpoint
   * @param user New user data
   */
  @Post('register')
  async create(@Body() user: User) {
    return this.authService.register(user);
  }

  /**
   * Login api endpoint
   * @param request Request object returned by the local Passport authentication strategy
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() request) {
    return this.authService.login(request.user);
  }
}
