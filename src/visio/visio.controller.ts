import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { VisioService } from './visio.service';
import { VisioDto } from './dto/visio.dto';
import { Visio } from './model/visio';
import { Formation } from '../formations/models/models';

@Controller('visio')
export class VisioController {
  constructor(private readonly visiService: VisioService) {}

  @Post()
  async create(@Body() visio: VisioDto) {
    const generatedId = await this.visiService.createForm(visio);

    return generatedId;
  }
  @Patch('/:id/:idR')
  async updateIdf(
    @Param('id') id: string,
    @Param('idR') idR: string,
  ): Promise<Visio> {
    return this.visiService.updateIdF(id, idR);
  }
  @Put('/app/:idApp/:idR')
  async updateIdApp(
    @Param('idApp') idApp: string,
    @Param('idR') idR: string,
  ): Promise<Visio> {
    return this.visiService.updateIdApp(idApp, idR);
  }
  @Get('/room/:idR')
  async findOnECat(@Param('idR') idR: string): Promise<Visio> {
    return await this.visiService.getByidR(idR);
  }
  @Patch('/desaffecter/:idA/:idR')
  async desaffecter(@Param('idA') idA: string, @Param('idR') idR: string) {
    return this.visiService.SuppIdR(idA, idR);
  }
  @Patch('/desaffecterForm/:idF/:idR')
  async desaffecterF(@Param('idF') idF: string, @Param('idR') idR: string) {
    return this.visiService.SuppIdRf(idF, idR);
  }
  //count by month pour ladmin
  @Get('/count/:mois/:year')
  async count(@Param('mois') mois: number,@Param('year') year:string) {
    return this.visiService.count(mois, year);
  }
  //count tout les visio by datedebut et fin

  @Get('/cou/:db/:df')
  async coun(@Param('db') db: string, @Param('df') df: string) {
    return this.visiService.getbydate(db, df);
  }
  //count all visio by formateur by date

  @Get('/cou/:db/:df/:idf')
  async getdatebyf(
    @Param('db') db: string,
    @Param('df') df: string,
    @Param('idf') idf: string,
  ) {
    return this.visiService.getdateidf(db, df, idf);
  }
  //nombre total de visioconférence pour chaque formateur

  @Get('/getidf/:idf')
  async getbyidf(@Param('idf') idf: string) {
    return await this.visiService.countbyidf(idf);
  }
  //duree totale de visioconference formateur

  @Get('/min/:idf')
  async countnbrmin(@Param('idf') idf: string) {
    return await this.visiService.countbymin(idf);
  }

  //get visio par date pour apprenant
  @Get('/countidApp/:db/:df/:idApp')
  async getbyidapp(
    @Param('idApp') idApp: string,
    @Param('db') db: string,
    @Param('df') df: string,
  ) {
    return await this.visiService.getdateidApp(db, df, idApp);
  }
  //duree totale de visioconference apprenant par heure

  @Get('/minapp/:idApp')
  async countnbrminapp(@Param('idApp') idApp: string) {
    return await this.visiService.countbyminAPP(idApp);
  }
  //nombre de visio conference pour chaque apprenant

  @Get('/getvisapp/:idApp')
  async getvisapp(@Param('idApp') idApp: string) {
    return await this.visiService.countvisapp(idApp);
  }
  //count by month pour formateur
  @Get('/countM/:mois/:year/:idF')
  async countF(
    @Param('mois') mois: number,
    @Param('year') year: string,
    @Param('idF') idF: string,
  ) {
    return this.visiService.countMF(mois, year, idF);
  }
  //count by month pour apprenant
  @Get('/countMApp/:mois/:year/:idApp')
  async countApp(@Param('mois') mois: number,@Param('year')year:string ,@Param('idApp') idApp: string) {
    return this.visiService.countMApp(mois, year, idApp);
  }

}
