import {
  Body,
  Controller,
  Delete,
  Get,
  Param, Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ChapitersService } from './chapiters.service';
import { ChapitreDto } from './dto/chapitre.dto';
import { Chapitre } from './interface/chapitre.interface';

@Controller('chapiters')
export class ChapitersController {
  constructor(private readonly ChapiterService: ChapitersService) {}

  @Post()
  async create(@Body() Chapitre: ChapitreDto) {
    const generatedId = await this.ChapiterService.createch(Chapitre);

    return generatedId;
  }

  @Get()
  async findAllF(): Promise<Chapitre[]> {
    return await this.ChapiterService.findAllF();
  }

  @Get('/findName')
  async findOneApp(@Body('name') name: string): Promise<Chapitre> {
    return await this.ChapiterService.findOneF(name);
  }
  @Get('/findEmail')
  async findOneFemail(@Body('email') email: string): Promise<Chapitre> {
    return await this.ChapiterService.findOneFemail(email);
  }

  @Get('/:id')
  async find(@Param('id') id: string) {
    return await this.ChapiterService.findOne(id);
  }
  @Get('/findch/:ch')
  async findOnECat(@Param('ch') formation: string): Promise<Chapitre[]> {
    return await this.ChapiterService.findByForm(formation);
  }

  @Put('/:id')
  async updateF(@Param('id') id: string, @Body() updateApp): Promise<Chapitre> {
    return await this.ChapiterService.updateF(id, updateApp);
  }
  @Delete(':id')
  async deleteF(@Param('id') id: string) {
    return await this.ChapiterService.deleteF(id);
  }
  @Patch(':id')
  async updateValidation(@Param('id') id: string): Promise<Chapitre> {
    return this.ChapiterService.updateValidation(id);
  }
}
