import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './manager.entity';
import { Repository } from 'typeorm';

/**
 * Manager handling service
 */
@Injectable()
export class ManagerService {

  /**
   * Service constructor
   * @param managerRepository Instance of TypeORM's repository service
   */
  constructor(@InjectRepository(Manager) private readonly managerRepository: Repository<Manager>) {
  }

  /**
   * Find manager by id
   * @param id House id
   */
  findById(id: string): Promise<Manager> {

    /* return the manager that matches with the id param, including its relationship with House */
    return this.managerRepository.findOne({ where: { id }, relations: ['houses'] });
  }

  /**
   * Create a house
   * @param manager New house data
   */
  async create(manager: Manager): Promise<Manager> {
    return await this.managerRepository.save(manager);
  }
}
