import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Categori } from '../formations/models/models';
import { CategoriDto } from './dto/categori.dto';
import { ChapitreDto } from '../chapiters/dto/chapitre.dto';
import { Chapitre } from '../chapiters/interface/chapitre.interface';

@Injectable()
export class CategorisService {
  constructor(
    @InjectModel('Categoris')
    private readonly catModel: Model<Categori>,
  ) {}

  async createC(categ: CategoriDto): Promise<any> {
    if (!(await this.finOneC(categ.name))) {
      return await new this.catModel({
        ...categ,
        createdAt: new Date(),
      }).save();
    } else {
      throw new UnprocessableEntityException('categorie already exists.');
    }
  }
  async findAllC(): Promise<Categori[]> {
    return await this.catModel.find().sort({ date: 'descending' }).exec();
  }
  async findOne(id: string): Promise<Categori> {
    return await this.catModel.findById(id).exec();
  }
  async finOneC(name): Promise<Categori> {
    return this.catModel.findOne({ name }).exec();
  }
  async dlete(id): Promise<Categori> {
    return await this.catModel.findByIdAndDelete(id).exec();
  }
  async updateC(id: string, update: ChapitreDto): Promise<Categori> {
    return await this.catModel.findByIdAndUpdate(id, update).exec();
  }
}
