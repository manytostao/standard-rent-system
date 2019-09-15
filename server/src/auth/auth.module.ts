import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ManagerModule } from '../manager/manager.module';

/**
 * Authentication module
 * @description Holds the registration of Passport strategies
 */
@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  imports: [
    UsersModule,
    ManagerModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    })],
  exports: [
    AuthService,
  ],

})
export class AuthModule {
}
