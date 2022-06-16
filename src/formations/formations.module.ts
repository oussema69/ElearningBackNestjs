import { Module } from '@nestjs/common';
import { FormationsService } from './formations.service';
import { FormationsController } from './formations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FormationSchema } from './schemas/formation.schema';

import { ChapitersModule } from 'src/chapiters/chapiters.module';
import { RessourcesModule } from 'src/ressources/ressources.module';
import { CategoriSchema } from '../categoris/schemas/categori.schema';
import { CategorisModule } from '../categoris/categoris.module';
import { ApprenantsService } from 'src/apprenants/apprenants.service';
import { ApprenantsModule } from 'src/apprenants/apprenants.module';
import { ApprenantSchema } from '../apprenants/schemas/apprenant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Formations', schema: FormationSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Categoris', schema: CategoriSchema }]),
    MongooseModule.forFeature([{ name: 'Apprenant', schema: ApprenantSchema }]),

    ChapitersModule,
    RessourcesModule,
    CategorisModule,
    ApprenantsModule,
  ],
  providers: [FormationsService],
  controllers: [FormationsController],
})
export class FormationsModule {}
