import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { HouseService } from './house.service';
import { House } from './house.entity';

describe('HouseService', () => {
    let service: HouseService;
    let repository: Repository<House>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HouseService,
                {
                    provide: getRepositoryToken(House),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<HouseService>(HouseService);
        repository = module.get<Repository<House>>(getRepositoryToken(House));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should call find on repository and return a promise with an array of Houses', async () => {
        const houses = [new House(), new House()];
        jest.spyOn(repository, 'find').mockImplementation(() => Promise.resolve(houses));
        expect(service.findAll()).toEqual(Promise.resolve(houses));
        expect(repository.find).toBeCalledWith({relations: ['manager']});
    });

    it('should call findOne on repository and return a promise with a House', async () => {
        const house = new House();
        jest.spyOn(repository, 'findOne').mockImplementation(() => Promise.resolve(house));
        expect(service.findById('1')).toEqual(Promise.resolve(house));
        expect(repository.findOne).toBeCalledWith({where: {id: '1'}, relations: ['manager']});
    });

    it('should call find on repository and return a promise with an array of Houses filtered by Manager id', async () => {
        const houses = [new House(), new House()];
        jest.spyOn(repository, 'find').mockImplementation(() => Promise.resolve(houses));
        expect(service.findByManagerId('1')).toEqual(Promise.resolve(houses));
        expect(repository.find).toBeCalledWith({where: {manager: '1'}, relations: ['manager']});
    });

    it('should create a new house using the repository', async () => {
        const house = new House();
        jest.spyOn(repository, 'save').mockImplementation(() => Promise.resolve(house));
        expect(service.create(house)).toEqual(Promise.resolve(house));
        expect(repository.save).toBeCalledWith(house);
    });

    it('should update a house using the repository', async () => {
        const house = new House();
        house.id = 1;
        const updateResult = new UpdateResult();
        jest.spyOn(repository, 'update').mockImplementation(() => Promise.resolve(updateResult));
        expect(service.update(house)).toEqual(Promise.resolve(updateResult));
        expect(repository.update).toBeCalledWith(house.id, house);
    });

    it('should delete a house using the repository', async () => {
        const deleteResult = new DeleteResult();
        jest.spyOn(repository, 'delete').mockImplementation(() => Promise.resolve(deleteResult));
        expect(service.delete(1)).toEqual(Promise.resolve(deleteResult));
        expect(repository.delete).toBeCalledWith(1);
    });
});
