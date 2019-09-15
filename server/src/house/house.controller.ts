import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';

import { HouseService } from './house.service';
import { House } from './house.entity';
import { AuthGuard } from '@nestjs/passport';

/**
 * House api endpoints
 */
@Controller('house')
export class HouseController {

  /**
   * Controller constructor
   * @param houseService Instance of HouseService
   */
  constructor(private readonly houseService: HouseService) {
  }

  /**
   * Api endpoint to retrieve all houses
   * @description Endpoint is guarded by Passport's jwt strategy
   * (call must be made with Authorization header)
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<House[]> {

    /* return all houses retrieved using house service */
    return this.houseService.findAll();
  }

  /**
   * Api endpoint to retrieve a house by its id
   * @description Endpoint is guarded by Passport's jwt strategy
   * (call must be made with Authorization header)
   */
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findById(@Param('id') id): Promise<House> {

    /* return the house that matches the id param */
    return this.houseService.findById(id);
  }

  /**
   * Api endpoint to retrieve all houses by its manager's id
   * @description Endpoint is guarded by Passport's jwt strategy
   * (call must be made with Authorization header)
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('manager/:id')
  async findByManagerId(@Param('id') managerId): Promise<House[]> {

    /* return all houses that belong to the specified manager */
    return this.houseService.findByManagerId(managerId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Body() house: House) {
    return this.houseService.create(house);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id/update')
  async update(@Param('id') id, @Body() house: House): Promise<any> {
    return this.houseService.update(house);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.houseService.delete(id);
  }

}
