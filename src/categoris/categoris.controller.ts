import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CategoriDto } from './dto/categori.dto';
import { CategorisService } from './categoris.service';
import { Categori, Formation } from '../formations/models/models';
import { Chapitre } from '../chapiters/interface/chapitre.interface';

@Controller('categoris')
export class CategorisController {
  constructor(private readonly catService: CategorisService) {}

  @Post()
  async create(@Body() categ: CategoriDto) {
    const generatedId = await this.catService.createC(categ);

    return generatedId;
  }
  @Get()
  async findAllF(): Promise<Categori[]> {
    return await this.catService.findAllC();
  }
  @Get('/:id')
  async find(@Param('id') id: string) {
    return await this.catService.findOne(id);
  }
  @Delete(':id')
  async deleteApp(@Param('id') id: string) {
    return await this.catService.dlete(id);
  }
  @Put('/:id')
  async updateF(@Param('id') id: string, @Body() updateApp): Promise<Categori> {
    return await this.catService.updateC(id, updateApp);
  }
}
