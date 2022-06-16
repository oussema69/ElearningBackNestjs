import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportStrategy } from '@nestjs/passport';
import { FormateursService } from '../formateurs.service';
import { JwtPayloadF } from '../interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private formateurService: FormateursService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mhatlioussema',
    });
  }

  async validate(payload: JwtPayloadF) {
    const formateur = await this.formateurService.validateUserByJwt(payload);

    if (!formateur) {
      throw new UnauthorizedException();
    }

    return formateur;
  }
}
