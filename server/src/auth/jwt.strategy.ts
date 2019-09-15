import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

/**
 * Passport's implementation of jwt authentication strategy
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {

    /* pass strategy configuration to parent so Passport knows what kind of strategy is */
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * Implementation of validate function that strategy executes
   * @param payload
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }

}
