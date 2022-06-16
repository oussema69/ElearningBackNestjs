import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FichierSchema } from './schemas/file.schemas';

 
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'fichiers', schema: FichierSchema },
    ]),
  ],
  providers: [FilesService],
  controllers: [FilesController],
  exports:[FilesService ]
}) 

export class FilesModule {}