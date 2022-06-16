import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer = require('multer');
import path = require('path');
import { ChapitreDto } from 'src/chapiters/dto/chapitre.dto';

import { FormationDto } from './dto/formation.dto';
import { FormationsService } from './formations.service';
import { Formation, Ressource } from './models/models';

@Controller('formations')
export class FormationsController {
  constructor(private readonly FormationsService: FormationsService) {}

  @Post()
  async create(@Body() formation: FormationDto) {
    const generatedId = await this.FormationsService.createForm(formation);

    return generatedId;
  }

  @Get()
  async findAllF(): Promise<Formation[]> {
    return await this.FormationsService.findAllForm();
  }

  @Get('/findName')
  async findOneApp(@Body('name') name: string): Promise<Formation> {
    return await this.FormationsService.findOneForm(name);
  }
  @Get('/findCut/:cat')
  async findOnECat(@Param('cat') cat: string): Promise<Formation[]> {
    return await this.FormationsService.findByCat(cat);
  }

  @Get('/:id')
  async find(@Param('id') id: string) {
    return await this.FormationsService.findOne(id);
  }
  @Put(':id')
  async updateForm(
    @Param('id') id: string,
    @Body() updateApp,
  ): Promise<Formation> {
    return await this.FormationsService.updateForm(id, updateApp);
  }
  @Delete(':id')
  async deleteF(@Param('id') id: string) {
    return await this.FormationsService.deleteForm(id);
  }

  @Put('/updateChapters/:id')
  async updateChapters(@Param('id') id: string, @Body() chapters: string[]) {
    return await this.FormationsService.updateChapters(id, chapters);
  }
  @Put('/affectation/:id/:idA')
  async Affect(@Param('id') id: string, @Param('idA') idA: string) {
    return await this.FormationsService.Affect(id, idA);
  }
  @Put('/daffectation/:id/:idA')
  async Daffect(@Param('id') id: string, @Param('idA') idA: string) {
    return await this.FormationsService.SuppAffect(id, idA);
  }
  //count formation by month
  @Get('/month/:mois/:year')
  async getByMonth(@Param('mois') mois: number, @Param('year') year: number) {
    return await this.FormationsService.countbymonth(mois, year);
  }
  //count form apprenant date
  @Get('/countidApp/:db/:df/:idApp')
  async getbyidapp(
    @Param('idApp') idApp: string,
    @Param('db') db: string,
    @Param('df') df: string,
  ) {
    return await this.FormationsService.getdateidApp(db, df, idApp);
  }
  @Get('/minapp/:idApp')
  async countnbrminapp(@Param('idApp') idApp: string) {
    return await this.FormationsService.countbyminAPP(idApp);
  }
  //count form date

  @Get('/cou/:db/:df')
  async coun(@Param('db') db: string, @Param('df') df: string) {
    return this.FormationsService.getbydate(db, df);
  }
  //count total formation by app
  @Get('/coufor/:idApp')
  async coune(@Param('idApp') idApp: string) {
    return this.FormationsService.countformapp(idApp);
  }
  //count by month pour apprenant
  @Get('/countMApp/:mois/:year/:idApp')
  async countApp(
    @Param('mois') mois: number,
    @Param('year') year: string,
    @Param('idApp') idApp: string,
  ) {
    return this.FormationsService.countMApp(mois, year, idApp);
  }
}
