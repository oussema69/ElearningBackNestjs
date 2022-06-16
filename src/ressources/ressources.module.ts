import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RessourceSchema } from './schemas/ressource.schema';
import { RessourcesController } from './ressources.controller';
import { RessourcesService } from './ressources.service';
 import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ressources', schema: RessourceSchema},
      
    ]),
    FilesModule
  ],
  controllers: [RessourcesController],
  providers: [RessourcesService],
  exports : [RessourcesService]
})
export class RessourcesModule {}
