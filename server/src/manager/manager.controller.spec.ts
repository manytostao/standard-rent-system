import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Manager } from './manager.entity';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';

describe('Manager Controller', () => {
    let controller: ManagerController;
    let managerService: ManagerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ManagerController],
            providers: [
                ManagerService,
                {
                    provide: getRepositoryToken(Manager),
                    useClass: Repository,
                },
            ],
        }).compile();

        controller = module.get<ManagerController>(ManagerController);
        managerService = module.get<ManagerService>(ManagerService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
