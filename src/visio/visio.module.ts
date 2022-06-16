import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VisioSchema } from './schemas/visio.schemas';
import { VisioService } from './visio.service';
import { VisioController } from './visio.controller';
import { ApprenantSchema } from '../apprenants/schemas/apprenant.schema';
import { FormateurSchema } from '../formateurs/schemas/formateur.schema';
import { VisioDto } from './dto/visio.dto';
import { Visio } from './interface/visio.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Visio', schema: VisioSchema }]),
    MongooseModule.forFeature([
      { name: 'Apprenants', schema: ApprenantSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'Formateurs', schema: FormateurSchema },
    ]),

  ],

  providers: [VisioService],
  controllers: [VisioController],
})
export class VisioModule {}
