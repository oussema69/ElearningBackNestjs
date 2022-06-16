import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';
import { ApprenantsService } from '../apprenants.service';
import { JwtPayloadA } from '../interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private apprenantservice: ApprenantsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mhatlioussema',
    });
  }

  async validate(payload: JwtPayloadA) {
    const app = await this.apprenantservice.validateUserByJwt(payload);

    if (!app) {
      throw new UnauthorizedException();
    }

    return app;
  }
}
