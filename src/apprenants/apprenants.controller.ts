import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApprenantsService } from './apprenants.service';
import { ApprenantDto } from './dto/apprenant.dto';
import { Apprenant } from './interface/apprenant.interface';
import { TokenADto } from './dto/token.dto';
import { Formateur } from '../formateurs/interface/formateur.interface';

@Controller('apprenants')
export class ApprenantsController {
  constructor(private readonly ApprenantsService: ApprenantsService) {}

  @Post()
  async create(@Body() apprenant: ApprenantDto) {
    const generatedId = await this.ApprenantsService.createApp(apprenant);

    return { id: generatedId };
  }

  @Get()
  async findAllApp(): Promise<Apprenant[]> {
    return this.ApprenantsService.findAllApp();
  }

  @Patch(':id')
  async updateValidation(@Param('id') id: string): Promise<Apprenant> {
    return this.ApprenantsService.updateValidation(id);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.ApprenantsService.findOne(id);
  }

  @Get('/findEmail')
  async findOneFemail(@Body('email') email: string): Promise<Apprenant> {
    return this.ApprenantsService.finOneAppemail(email);
  }
  @Put('/:id')
  async updateApp(
    @Param('id') id: string,
    @Body() updateApp,
  ): Promise<Apprenant> {
    return this.ApprenantsService.updateApp(id, updateApp);
  }
  @Delete(':id')
  async deleteApp(@Param('id') id: string) {
    return await this.ApprenantsService.deleteApp(id);
  }
  @Get('formations/:id')
  async findbyNotformation(@Param('id') id: string) {
    return await this.ApprenantsService.findByNotFormation(id);
  }
  @Get('formationss/:id')
  async findbyformation(@Param('id') id: string) {
    return await this.ApprenantsService.findByFormation(id);
  }
  @Put('/affecter/:id/:idF')
  async affFormation(
    @Param('id') id: string,
    @Param('idF') idF: string,
  ): Promise<Apprenant> {
    return this.ApprenantsService.affecteFormation(id, idF);
  }

  @Put('/desactiver/:id/:idF')
  async suppFormation(
    @Param('id') id: string,
    @Param('idF') idF: string,
  ): Promise<Apprenant> {
    return this.ApprenantsService.suppAffFormation(id, idF);
  }

  @Post('/login')
  async sendToken(@Res() res, @Body() tokenDto: TokenADto) {
    const app = await this.ApprenantsService.login(tokenDto);
    if (app === null) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'email or password incorrecte',
      });
    }
    return res.status(HttpStatus.OK).json({
      token: app,
    });
  }

  @Put('/up/:id/:idR')
  async affecterRoom(@Param('id') id: string, @Param('idR') idRoom: string) {
    return await this.ApprenantsService.ajouterId(id, idRoom);
  }
  @Get('/findRoom/:idRoom')
  async findOneRoom(@Param('idRoom') idRoom: string): Promise<Apprenant[]> {
    return await this.ApprenantsService.findByRoom(idRoom);
  }
  //count by month pour ladmin
  @Get('/count/:mois/:year')
  async count(@Param('mois') mois: number, @Param('year') year: string) {
    return this.ApprenantsService.countByMonth(mois, year);
  }
}
