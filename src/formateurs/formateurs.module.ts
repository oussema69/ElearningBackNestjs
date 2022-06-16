import { Module } from '@nestjs/common';
import { FormateursService } from './formateurs.service';
import { FormateursController } from './formateurs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FormateurSchema } from './schemas/formateur.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../users/key';
import { HttpModule } from '@nestjs/common';
import { VisioSchema } from '../visio/schemas/visio.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Formateurs', schema: FormateurSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Visio', schema: VisioSchema }]),

    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secretOrPrivateKey: jwtConstants.secret,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    HttpModule,
  ],
  providers: [FormateursService],
  controllers: [FormateursController],
})
export class FormateursModule {}
