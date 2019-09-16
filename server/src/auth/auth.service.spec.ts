import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { AuthService } from './auth.service';
import { ManagerService } from '../manager/manager.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { Manager } from '../manager/manager.entity';
import { jwtConstants } from './constants';

describe('AuthService', () => {
    let authService: AuthService;
    let usersService: UsersService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [JwtModule.register({secret: jwtConstants.secret})],
            providers: [
                AuthService,
                UsersService,
                ManagerService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Manager),
                    useClass: Repository,
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    it('should get the user from the repository on validating user', async () => {
        jest.spyOn(usersService, 'findOne');
        authService.validateUser('someUsername', 'somePassword');
        expect(usersService.findOne).toBeCalledWith('someUsername');
    });

    it('should return the user if found when validating', async () => {
        const mockUser = {
            username: 'someUsername',
            password: 'somePassword',
            id: 1,
            managerProfile: {
                id: 2,
                name: 'someManagerName',
                lastName: 'someManagerLastName',
                email: 'someManagerEmail',
                houses: [],
            },
        };
        jest.spyOn(usersService, 'findOne').mockImplementation(() => Promise.resolve(mockUser));
        expect(authService.validateUser('someUsername', 'somePassword')).toEqual(Promise.resolve(mockUser));
    });

    it('should return null if the user password did not mach when validating', async () => {
        const mockUser = {
            username: 'someUsername',
            password: 'somePassword',
            id: 1,
            managerProfile: {
                id: 2,
                name: 'someManagerName',
                lastName: 'someManagerLastName',
                email: 'someManagerEmail',
                houses: [],
            },
        };
        jest.spyOn(usersService, 'findOne').mockImplementation(() => Promise.resolve(mockUser));
        expect(authService.validateUser('someUsername', 'someOtherPassword')).toEqual(new Promise(() => null));
    });

    it('should return null if no user user was found when validating', async () => {
        jest.spyOn(usersService, 'findOne').mockImplementation(() => Promise.resolve(undefined));
        expect(authService.validateUser('someUsername', 'someOtherPassword')).toEqual(new Promise(() => null));
    });

    it('should return an object containing the access token when login in', async () => {
        const payload = {username: 'someUsername', sub: 1, managerId: 2};
        const access_token = jwtService.sign(payload);
        expect(authService.login(payload)).toEqual(Promise.resolve({access_token}));
    });

    it('should create the user when registering it', async () => {
        const payload = {
            email: 'someEmail',
            name: 'someName',
            lastName: 'someLastName',
            username: 'someUsername',
            password: 'somePassword',
        };
        jest.spyOn(usersService, 'create').mockImplementation(() => Promise.resolve(new User()));
        authService.register(payload);
        expect(usersService.create).toBeCalled();
    });
});
