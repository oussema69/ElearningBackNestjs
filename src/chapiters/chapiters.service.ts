import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChapitreDto } from './dto/chapitre.dto';
import { Chapitre } from './interface/chapitre.interface';
import { Apprenant } from '../apprenants/interface/apprenant.interface';

@Injectable()
export class ChapitersService {
  constructor(
    @InjectModel('Chapiters')
    private readonly ChapiterModel: Model<Chapitre>,
  ) {}

  async findByIdandUp(id: string, up: Chapitre): Promise<any> {
    return await this.ChapiterModel.findByIdAndUpdate(id, up);
  }

  async createch(Chapitre: ChapitreDto): Promise<Chapitre> {
    return await new this.ChapiterModel({
      ...Chapitre,
      createdAt: new Date(),
    }).save();
  }

  /**
   * Find all Chapitre
   */
  async findAllF(): Promise<Chapitre[]> {
    return await this.ChapiterModel.find().exec();
  }
  /**
   * Find Chapitre by name
   */
  async findOneF(name): Promise<Chapitre> {
    return await this.ChapiterModel.findOne({ name }).exec();
  }

  /**
   * Find Chapitre by email
   */
  async findOneFemail(email): Promise<Chapitre> {
    return await this.ChapiterModel.findOne({ email }).exec();
  }
  async findByForm(formation): Promise<Chapitre[]> {
    return await this.ChapiterModel.find({ formation }).exec();
  }
  /**
   * find Chapitre by Chapitre
   */

  async findOne(id: string): Promise<Chapitre> {
    return await this.ChapiterModel.findById(id).exec();
  }
  /**
   * update Chapitre
   */
  async updateF(id: string, update: ChapitreDto): Promise<Chapitre> {
    return await this.ChapiterModel.findByIdAndUpdate(id, update).exec();
  }
  /**
   * delete Chapitre
   */
  async deleteF(id: string): Promise<Chapitre> {
    return await this.ChapiterModel.findByIdAndDelete(id).exec();
  }
  async updateValidation(id: string): Promise<Chapitre> {
    const ch = await this.ChapiterModel.findById(id);
    ch.visible = !ch.visible;
    return this.ChapiterModel.findByIdAndUpdate(id, ch);
  }
}
