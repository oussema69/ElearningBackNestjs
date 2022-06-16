import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriSchema } from './schemas/categori.schema';

import { CategorisController } from './categoris.controller';
import { CategorisService } from './categoris.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Categoris', schema: CategoriSchema }]),
  ],
  providers: [CategorisService],
  controllers: [CategorisController],
  exports: [CategorisService],
})
export class CategorisModule {}
