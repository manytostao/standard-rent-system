import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from './house.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

/**
 * House handling service
 */
@Injectable()
export class HouseService {

  /**
   * Service constructor
   * @param houseRepository Instance of TypeORM's repository service
   */
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>) {
  }

  /**
   * Find all houses
   */
  async findAll(): Promise<House[]> {

    /* return all houses, including their relationship with Manager */
    return await this.houseRepository.find({ relations: ['manager'] });
  }

  /**
   * Find house by id
   * @param id House id
   */
  findById(id: string): Promise<House> {

    /* return the house that matches with the id param, including its relationship with Manager */
    return this.houseRepository.findOne({ where: { id }, relations: ['manager'] });
  }

  /**
   * Find all houses by Manager id
   * @param managerId Manager id
   */
  findByManagerId(managerId: string): Promise<House[]> {

    /* return all houses that to the manager's id, including its relationship with Manager */
    return this.houseRepository.find({ where: { manager: managerId }, relations: ['manager'] });
  }

  /**
   * Create a house
   * @param house New house data
   */
  async create(house: House): Promise<House> {
    return await this.houseRepository.save(house);
  }

  /**
   * Update a house
   * @param house Modified house data
   */
  async update(house: House): Promise<UpdateResult> {
    return await this.houseRepository.update(house.id, house);
  }

  /**
   * Delete a house by its id
   * @param id House Id
   */
  async delete(id): Promise<DeleteResult> {
    return await this.houseRepository.delete(id);
  }
}
