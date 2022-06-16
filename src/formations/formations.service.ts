import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChapitersService } from 'src/chapiters/chapiters.service';
import { ChapitreDto } from 'src/chapiters/dto/chapitre.dto';
import { RessourcesService } from 'src/ressources/ressources.service';
import { FormationDto } from './dto/formation.dto';
import {
  Apprenant,
  Categori,
  Chapitre,
  Formation,
  Ressource,
} from './models/models';
import { CategoriDto } from '../categoris/dto/categori.dto';
import { CategorisService } from '../categoris/categoris.service';
import { ApprenantsService } from 'src/apprenants/apprenants.service';
import { async } from 'rxjs';
@Injectable()
export class FormationsService {
  private Formation: Formation[] = [];
  constructor(
    @InjectModel('Formations')
    private readonly formationModel: Model<Formation>,
    private readonly chapterService: ChapitersService,
    private readonly resService: RessourcesService,
    private readonly cat: CategorisService,
    private readonly app: ApprenantsService,
    @InjectModel('Categoris') private readonly catModel: Model<Categori>,
    @InjectModel('Apprenant') private readonly appModel: Model<Apprenant>,
  ) {}

  async createForm(formation: FormationDto): Promise<Formation> {
    return await new this.formationModel({
      ...formation,
      createdAt: new Date(),
    }).save();
  }

  async findAllForm(): Promise<Formation[]> {
    return await this.formationModel.find().exec();
  }
  /**
   * Find formation by name
   */
  async findOneForm(name): Promise<Formation> {
    return await this.formationModel.findOne({ name }).exec();
  }
  async findByCat(cat): Promise<Formation[]> {
    return await this.formationModel
      .find({ cat })
      .sort({ dateDepot: 'descending' })
      .exec();
  }

  async updateChapters(id: string, ch: string[]): Promise<Formation> {
    const f = await this.formationModel.findById(id);
    f.chapitre = ch;
    return await this.formationModel.findByIdAndUpdate(id, f);
  }
  /**
   * find formation by formation
   */

  async findOne(id: string): Promise<Formation> {
    return await this.formationModel.findById(id).exec();
  }
  /**
   * update formation
   */
  async updateForm(id: string, update: FormationDto): Promise<any> {
    return await this.formationModel.findByIdAndUpdate(id, update).exec();
  }
  /**
   * delete formation
   */
  async deleteForm(id: string): Promise<Formation> {
    return await this.formationModel.findByIdAndDelete(id).exec();
  }

  async Affect(id: string, idA: any) {
    const formation = await this.formationModel.findById(id);

    if (formation.apprenants.includes(idA)) {
      throw new UnprocessableEntityException(' already exists.');
    } else {
      const apprenant = await this.app.affecteFormation(idA, id);
      formation.apprenants.push(idA);
      return await this.formationModel.findByIdAndUpdate(id, formation).exec();
    }
  }
  async SuppAffect(id: string, idA: any) {
    const formation = await this.formationModel.findById(id);
    const apprenant = await this.app.suppAffFormation(idA, id);
    const x = formation.apprenants.indexOf(idA);

    formation.apprenants.splice(x, 1);

    return await this.formationModel.findByIdAndUpdate(id, formation).exec();
  }
  //count formation by month
  async countbymonth(mois, year) {
    return this.formationModel.find({ month: mois, year: year }).count().exec();
  }
  //get formation by date ll apprenant
  async getdateidApp(dated, datef, idApp) {
    return this.formationModel
      .find({
        dateDepot: {
          $gte: new Date(dated),
          $lt: new Date(datef),
        },
        apprenants: idApp,
      })
      .count()

      .exec();
  }
  //count nbr heure pour tous les formation
  async countbyminAPP(idApp): Promise<any> {
    const app = await this.appModel.findById(idApp);
    let duration = 0;
    for (const i of app.formations) {
      const room = await this.formationModel.findById(i);

      duration = duration + room.nbrH;
    }
    return duration;
  }
  //nombre totale de formation b date l admin
  async getbydate(dated, datef) {
    return this.formationModel
      .find({
        dateDepot: {
          $gte: new Date(dated),
          $lt: new Date(datef),
        },
      })
      .count()

      .exec();
  }
  //formatio ll app
  async countformapp(idApp) {
    return this.formationModel
      .find({ apprenants: idApp })
      .count()

      .exec();
  }
  //count by month ll apprenant
  async countMApp(mois, year, idApp) {
    return this.formationModel
      .find({ month: mois, year: year, idApp: idApp })
      .count()
      .exec();
  }
}
