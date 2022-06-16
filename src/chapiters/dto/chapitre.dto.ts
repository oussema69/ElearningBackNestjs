import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsEmail } from 'class-validator';
import mongoose from 'mongoose'; 
import { Transform, Type } from 'class-transformer';
import { Ressource } from 'src/formations/models/models';

export class ChapitreDto {
  @IsNotEmpty()
  id?: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  desc: string;
  @IsNotEmpty()
  formation:string;
}
