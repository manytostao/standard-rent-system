import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Manager } from './manager.entity';
import { ManagerService } from './manager.service';

describe('ManagerService', () => {
    let service: ManagerService;
    let repository: Repository<Manager>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ManagerService,
                {
                    provide: getRepositoryToken(Manager),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<ManagerService>(ManagerService);
        repository = module.get<Repository<Manager>>(getRepositoryToken(Manager));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should call findOne on repository and return a promise with a House', async () => {
        const manager = new Manager();
        jest.spyOn(repository, 'findOne').mockImplementation(() => Promise.resolve(manager));
        expect(service.findById('1')).toEqual(Promise.resolve(manager));
        expect(repository.findOne).toBeCalledWith({where: {id: '1'}, relations: ['houses']});
    });

    it('should create a new manager using the repository', async () => {
        const manager = new Manager();
        jest.spyOn(repository, 'save').mockImplementation(() => Promise.resolve(manager));
        expect(service.create(manager)).toEqual(Promise.resolve(manager));
        expect(repository.save).toBeCalledWith(manager);
    });
});
