import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ManagerService } from './manager.service';
import { Manager } from './manager.entity';

/**
 * Manager api endpoints
 */
@Controller('manager')
export class ManagerController {

  /**
   * Controller constructor
   * @param managerService Instance of ManagerService
   */
  constructor(private managerService: ManagerService) {
  }

  /**
   * Api endpoint to retrieve a manager by its id
   * @description Endpoint is guarded by Passport's jwt strategy
   * (call must be made with Authorization header)
   */
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findById(@Param('id') id): Promise<Manager> {

    /* return the manager that matches the id param */
    return this.managerService.findById(id);
  }
}
