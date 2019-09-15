import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

import { User } from './user.entity';

/**
 * User api endpoints
 */
@Controller('user')
export class UsersController {

  /**
   * Controller constructor
   * @param usersService Instance of UsersService
   */
  constructor(private usersService: UsersService) {
  }

  /**
   * Api endpoint to retrieve all users
   * @description Endpoint is guarded by Passport's jwt strategy
   * (call must be made with Authorization header)
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
