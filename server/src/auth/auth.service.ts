import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { ManagerService } from '../manager/manager.service';
import { Manager } from '../manager/manager.entity';

/**
 * Authentication service
 */
@Injectable()
export class AuthService {

  /**
   * Service constructor
   * @param usersService Instance of UserService
   * @param managerService Instance of ManagerService
   * @param jwtService Instance of JWT manipulation service
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly managerService: ManagerService,
    private readonly jwtService: JwtService,
  ) {
  }

  /**
   * Function to validate a user in authentication process
   * @param username User's username
   * @param pass User's password
   */
  async validateUser(username: string, pass: string): Promise<any> {

    /* try to get a user from user service */
    const user = await this.usersService.findOne(username);

    /* if there is one, return it, otherwise, return null*/
    if (user && user.password === pass) {
      return { username: user.username, id: user.id, managerId: user.managerProfile.id };
    }
    return null;
  }

  /**
   * Login function
   * @param user User trying attempting to log in
   */
  async login(user: any) {

    /* create the payload that will be encrypted in jwt and return it */
    const payload = { username: user.username, sub: user.id, managerId: user.managerId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Registration function
   * @param payload Data payload necessary to register a new user
   */
  async register(payload: any) {

    /* create the new User object and execute login process*/
    const manager = new Manager();
    manager.email = payload.email;
    manager.name = payload.name;
    manager.lastName = payload.lastName;
    const user = new User();
    user.username = payload.username;
    user.password = payload.password;
    user.managerProfile = manager;
    const registeredUser = await this.usersService.create(user);
    return await this.login({ ...registeredUser, managerId: user.managerProfile.id });
  }
}
