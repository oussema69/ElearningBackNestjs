import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { ChapitersController } from './chapiters.controller';
import { ChapitersService } from './chapiters.service';
import { ChapitreSchema } from './schemas/chapitre.schema';

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: 'Chapiters', schema: ChapitreSchema },
      ]), 
    ],
    providers: [ChapitersService],
    controllers: [ChapitersController],
    exports : [ChapitersService]
  })
   
export class ChapitersModule {}
