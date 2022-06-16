import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { RessourcesService } from './ressources.service';

import { Ressource } from 'src/formations/models/models';

@Controller('ressources')
export class RessourcesController {
  constructor(private ressourceService: RessourcesService) {}
  @Post()
  async create(@Body() ressource: Ressource) {
    return await this.ressourceService.createR(ressource);
  }

  @Get()
  async findAllR(): Promise<Ressource[]> {
    return this.ressourceService.findAllR();
  }
  @Get('/:id')
  async find(@Param('id') id: string) {
    return await this.ressourceService.findOne(id);
  }
  @Get('/findch/:idch')
  async findOnECat(@Param('idch') idch: string): Promise<Ressource[]> {
    return await this.ressourceService.getch(idch);
  }
  @Put(':id')
  async updateR(
    @Param('id') id: string,
    @Body() updateApp,
  ): Promise<Ressource> {
    return this.ressourceService.updateR(id, updateApp);
  }
  @Delete(':id')
  async deleteR(@Param('id') id: string) {
    return await this.ressourceService.deleteR(id);
  }
}
