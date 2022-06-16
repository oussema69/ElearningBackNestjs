import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { exec } from 'child_process';
import { Model } from 'mongoose';
import { Ressource } from 'src/formations/models/models';

import { RessourceDto } from './dto/ressource.dto';

@Injectable()
export class RessourcesService {
  constructor(
    @InjectModel('ressources')
    private readonly ressourceModel: Model<Ressource>,
  ) {}

  async createR(ressource: Ressource): Promise<Ressource> {
    return await new this.ressourceModel({
      ...ressource,
      createdAt: new Date(),
    }).save();
  }
  async findAllR(): Promise<Ressource[]> {
    return this.ressourceModel.find().exec();
  }
  async findOne(id: string): Promise<any> {
    return await this.ressourceModel.findById(id).exec();
  }
  async getch(idch): Promise<Ressource[]> {
    return await this.ressourceModel.find({ idch }).exec();
  }
  async updateR(id: string, update: RessourceDto): Promise<Ressource> {
    return await this.ressourceModel.findByIdAndUpdate(id, update).exec();
  }
  async deleteR(id: string): Promise<Ressource> {
    return await this.ressourceModel.findByIdAndDelete(id).exec();
  }
}
