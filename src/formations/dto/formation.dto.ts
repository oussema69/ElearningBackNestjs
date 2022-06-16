import { IsNotEmpty, IsEmail } from 'class-validator';

import * as mongoose from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import { Categori } from '../models/models';
import { CategoriDto } from '../../categoris/dto/categori.dto';
export class FormationDto {
  @IsNotEmpty()
  id?: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  desc: string;
  @IsNotEmpty()
  cat: string;
  @IsNotEmpty()
  nbrH: number;
  @IsNotEmpty()
  dateDepot: Date;
  @IsNotEmpty()
  urlimg: string;
  month: number;
  year: number;
}
