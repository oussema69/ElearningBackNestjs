import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApprenantsController } from './apprenants.controller';
import { ApprenantsService } from './apprenants.service';
import { ApprenantSchema } from './schemas/apprenant.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../users/key';
import { FcmModule } from 'nestjs-fcm';
import path from 'path';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Apprenants', schema: ApprenantSchema },
    ]),

    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secretOrPrivateKey: jwtConstants.secret,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [ApprenantsService],
  controllers: [ApprenantsController],
  exports: [ApprenantsService],
})
export class ApprenantsModule {}
