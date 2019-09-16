import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { House } from '../house/house.entity';

describe('UsersService', () => {
    let service: UsersService;
    let repository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        repository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should call find on repository and return a promise with an array of Managers', async () => {
        const users = [new User(), new User()];
        jest.spyOn(repository, 'find').mockImplementation(() => Promise.resolve(users));
        expect(service.findAll()).toEqual(Promise.resolve(users));
        expect(repository.find).toBeCalled();
    });

    it('should call findOne on repository and return a promise with a User', async () => {
        const user = new User();
        jest.spyOn(repository, 'findOne').mockImplementation(() => Promise.resolve(user));
        expect(service.findOne('someUsername')).toEqual(Promise.resolve(user));
        expect(repository.findOne).toBeCalledWith({where: {username: 'someUsername'}, relations: ['managerProfile']});
    });

    it('should create a new user using the repository', async () => {
        const user = new User();
        jest.spyOn(repository, 'save').mockImplementation(() => Promise.resolve(user));
        expect(service.create(user)).toEqual(Promise.resolve(user));
        expect(repository.save).toBeCalledWith(user);
    });
});
