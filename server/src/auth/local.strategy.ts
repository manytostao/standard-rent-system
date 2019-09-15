import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * Passport's implementation of local authentication strategy
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {

    /* no configuration on super call means default (local) authentication strategy */
    super();
  }

  /**
   * Implementation of validate function that strategy executes
   * @param username User's username
   * @param password User's password
   */
  async validate(username: string, password: string): Promise<any> {

    /* validate the user using authService function */
    const user = await this.authService.validateUser(username, password);

    /* if the user doesn't exists, return unauthorized, else return user */
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
