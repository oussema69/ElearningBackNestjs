import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Request,
  Put,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
  HttpModule,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, tap, map } from 'rxjs';
import { Formation } from 'src/formations/models/models';
import { User } from 'src/users/interface/user.interface';
import { FormateurDto } from './dto/formateur.dto';
import { FormateursService } from './formateurs.service';
import { Formateur } from './interface/formateur.interface';
import { TokenDto } from '../users/dto/token.dto';
import { TokenFDto } from './dto/token.dto';

@Controller('formateurs')
export class FormateursController {
  constructor(private readonly FormateursService: FormateursService) {}

  @Post()
  async create(@Body() formateur: FormateurDto) {
    const generatedId = await this.FormateursService.createF(formateur);

    return { id: generatedId };
  }

  @Get()
  async findAllF(): Promise<Formateur[]> {
    return this.FormateursService.findAllF();
  }

  @Patch(':id')
  async updateValidation(@Param('id') id: string): Promise<Formateur> {
    return this.FormateursService.updateValidation(id);
  }
  @Get('/findName')
  async findOneApp(@Body('name') name: string): Promise<Formateur> {
    return this.FormateursService.findOneF(name);
  }
  @Get('/findEmail')
  async findOneFemail(@Body('email') email: string): Promise<Formateur> {
    return this.FormateursService.findOneFemail(email);
  }

  @Get('/:id')
  async find(@Param('id') id: string) {
    return await this.FormateursService.findOne(id);
  }
  @Put(':id')
  async updateF(
    @Param('id') id: string,
    @Body() updateApp,
  ): Promise<Formateur> {
    return this.FormateursService.updateF(id, updateApp);
  }
  @Delete(':id')
  async deleteF(@Param('id') id: string) {
    return await this.FormateursService.deleteF(id);
  }
  @Get('/findspec/:spec')
  async findOnECat(@Param('spec') spec: string): Promise<Formateur[]> {
    return await this.FormateursService.findByspec(spec);
  }

  @Post('/login')
  async sendToken(@Res() res, @Body() tokenDto: TokenFDto) {
    const formateur = await this.FormateursService.login(tokenDto);
    if (formateur === null) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'email or password incorrecte',
      });
    }
    return res.status(HttpStatus.OK).json({
      token: formateur,
    });
  }
  @Post('/room')
  async room(@Body() body: any) {
    console.log(body);
    return await (
      await this.FormateursService.createRoom(
        body.nom,
        body.desc,
        body.date,
        body.duration,
      )
    ).pipe(
      map((res) => {
        console.log(res.data);
        return res.data;
      }),
    );
  }
  @Post('/rooms')
  async getRooms() {
    return await (
      await this.FormateursService.getAllRooms()
    ).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }
  @Post('/rooms/:id')
  async getRoomsById(@Param('id') id: string) {
    return await (
      await this.FormateursService.getRoomById(id)
    ).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }
  @Post('/roomsup/:id')
  async updateRoom(@Param('id') id: string, @Body() body: any) {
    await (
      await this.FormateursService.update(
        id,
        body.nom,
        body.desc,
        body.date,
        body.duration,
      )
    ).subscribe({
      next: (res) => {
        return res;
      },
    });
  }

  @Put('/up/:id/:idR')
  async updateChapters(@Param('id') id: string, @Param('idR') idRoom: string) {
    return await this.FormateursService.ajouterId(id, idRoom);
  }

  @Get('/findRoom/:idRoom')
  async findOneRoom(@Param('idRoom') idRoom: string): Promise<Formateur[]> {
    return await this.FormateursService.findByRoom(idRoom);
  }
  @Post('/d/:id')
  async delete(@Param('id') id: string) {
    await (
      await this.FormateursService.delete(id)
    ).subscribe((res) => {
      console.log(res);
    });
  }
  @Get('/findR/idF')
  async findRoomsByIdF(@Param('idF') idF: string) {
    return await this.FormateursService.getRommByFor(idF);
  }
  @Get('/count/:mois/:year')
  async count(@Param('mois') mois: number, @Param('year') year: string) {
    return this.FormateursService.countByMonth(mois, year);
  }
}
