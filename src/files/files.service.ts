import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Fichier } from './interface/file.interface';
import { Model } from 'mongoose';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel('fichiers')
    private readonly fichierModel: Model<Fichier>,
  ) {}

  async createFic(fichier: Express.Multer.File): Promise<Fichier> {
    return await new this.fichierModel({
      ...fichier,
      createdAt: new Date(),
    }).save();
  }
  async findAllFic(): Promise<Fichier[]> {
    return this.fichierModel.find().exec();
  }
  async findOne(id: string): Promise<Blob> {
    const f = await this.fichierModel.findById(id).exec();
    return f;
  }

  async deleteFic(id: string): Promise<Fichier> {
    return await this.fichierModel.findByIdAndDelete(id).exec();
  }
}
