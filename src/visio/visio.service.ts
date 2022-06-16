import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Visio } from './model/visio';
import { VisioDto } from './dto/visio.dto';
import { Apprenant } from '../apprenants/interface/apprenant.interface';
import { Formateur } from '../formateurs/interface/formateur.interface';

@Injectable()
export class VisioService {
  constructor(
    @InjectModel('Visio')
    private readonly visioModel: Model<Visio>,
    @InjectModel('Apprenants')
    private readonly appModel: Model<Apprenant>,
    @InjectModel('Formateurs')
    private readonly formModel: Model<Formateur>,
  ) {}
  async createForm(visio: VisioDto): Promise<Visio> {
    return await new this.visioModel({
      ...visio,
      createdAt: new Date(),
    }).save();
  }
  async updateIdF(idf, idR): Promise<Visio> {
    const room = await this.visioModel.findOne({ idR });

    room.idF = idf;
    return this.visioModel.findByIdAndUpdate(room._id, room);
  }
  async updateIdApp(idApp, idR): Promise<Visio> {
    const room = await this.visioModel.findOne({ idR });
    room.idApp.push(idApp);

    return this.visioModel.findByIdAndUpdate(room._id, room);
  }
  async getByidR(idR: string): Promise<Visio> {
    return this.visioModel.findOne({ idR });
  }
  async SuppIdR(idA, idR) {
    const room = await this.visioModel.findOne({ idR });
    room.idApp.splice(room.idApp.indexOf(idA), 1);

    const apprenant = await this.appModel.findById(idA);
    apprenant.idR.splice(apprenant.idR.indexOf(idR), 1);
    await this.appModel.findByIdAndUpdate(apprenant._id, apprenant);
    await this.visioModel.findByIdAndUpdate(room._id, room);
    const app = await this.visioModel.findOne({ idR });
    return app;
  }
  async SuppIdRf(idF, idR) {
    const room = await this.visioModel.findOne({ idR });
    const formateur = await this.formModel.findById(idF);

    formateur.idR.splice(formateur.idR.indexOf(idR), 1);

    await this.formModel.findByIdAndUpdate(formateur._id, formateur);
    room.idF = '';
    await this.visioModel.findByIdAndUpdate(room._id, room);
    const app = await this.visioModel.findOne({ idR });
    return app;
  }
  //count by month
  async count(mois, year) {
    return this.visioModel
      .find({
        month: mois,
        year: year,
      })
      .count()
      .exec();
  }
  //count tout les visio by datedebut et fin
  async getbydate(dated, datef) {
    return this.visioModel
      .find({
        date: {
          $gte: new Date(dated),
          $lt: new Date(datef),
        },
      })
      .count()

      .exec();
  }
  //count all visio by formateur by date
  async getdateidf(dated, datef, idf) {
    return this.visioModel
      .find({
        date: {
          $gte: new Date(dated),
          $lt: new Date(datef),
        },
        idF: idf,
      })
      .count()

      .exec();
  }
  //nombre total de visioconférence pour chaque formateur
  async countbyidf(idf) {
    return this.visioModel.find({ idF: idf }).count().exec();
  }
  //duree totale de visioconference formateur
  async countbymin(idf): Promise<any> {
    const formateur = await this.formModel.findById(idf);
    let duration = 0;
    for (const i of formateur.idR) {
      const room = await this.visioModel.findOne({ i });

      duration = duration + room.dure;
    }
    return duration / 60;
  }
  //count all visio date by apprenant
  async getdateidApp(dated, datef, idApp) {
    return this.visioModel
      .find({
        date: {
          $gte: new Date(dated),
          $lt: new Date(datef),
        },
        idApp: idApp,
      })
      .count()

      .exec();
  }
  //duree totale de visioconference apprenant par heure
  async countbyminAPP(idApp): Promise<any> {
    const app = await this.appModel.findById(idApp);
    let duration = 0;
    for (const i of app.idR) {
      const room = await this.visioModel.findOne({ i });

      duration = duration + room.dure;
    }
    return duration / 60;
  }
  //nombre de visio conference pour chaque apprenant
  async countvisapp(idApp) {
    return this.visioModel.find({ idApp: idApp }).count().exec();
  }
  //count by month ll formateur
  async countMF(mois, year, idf) {
    return this.visioModel
      .find({ month: mois, year: year, idF: idf })
      .count()
      .exec();
  }
  //count by month ll apprenant
  async countMApp(mois, year, idApp) {
    return this.visioModel
      .find({ month: mois, year: year, idApp: idApp })
      .count()
      .exec();
  }
}
