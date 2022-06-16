import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Apprenant } from './interface/apprenant.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ApprenantDto } from './dto/apprenant.dto';
import * as jwt from 'jsonwebtoken';
import { TokenADto } from './dto/token.dto';
import { JwtPayloadA } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class ApprenantsService {
  constructor(
    @InjectModel('Apprenants')
    private readonly apprenantModel: Model<Apprenant>,
    private jwtService: JwtService,
  ) {}

  async createApp(apprenant: ApprenantDto): Promise<Apprenant> {
    if (!(await this.finOneAppemail(apprenant.email))) {
      return await new this.apprenantModel({
        ...apprenant,
        createdAt: new Date(),
      }).save();
    } else {
      throw new UnprocessableEntityException('apprenant already exists.');
    }
  }
  async suppAffFormation(id: string, idF: string) {
    const apprenant = await this.apprenantModel.findById(id);
    const x = apprenant.formations.indexOf(idF);

    apprenant.formations.splice(x, 1);
    return await this.apprenantModel.findByIdAndUpdate(id, apprenant).exec();
  }

  async findByNotFormation(formation): Promise<Apprenant[]> {
    return this.apprenantModel
      .find({ formations: { $nin: [formation] } })
      .exec();
  }
  async findByFormation(formation): Promise<Apprenant[]> {
    return this.apprenantModel
      .find({ formations: { $in: [formation] } })
      .exec();
  }

  /**
   * Find all apprenant
   */
  async findAllApp(): Promise<Apprenant[]> {
    return this.apprenantModel.find().sort({ date: 'descending' }).exec();
  }
  /**
   * Find apprenant by name
   */
  async finOneApp(name): Promise<Apprenant> {
    return this.apprenantModel.findOne({ name }).exec();
  }

  /**
   * Find apprenant by email
   */

  async finOneAppemail(email): Promise<Apprenant> {
    return this.apprenantModel.findOne({ email }).exec();
  }
  /**
   * find apprenant by apprenant
   */

  async findOne(id: string): Promise<any> {
    return await this.apprenantModel.findById(id).exec();
  }
  /**
   * update apprenant
   */
  async updateApp(id: string, update: ApprenantDto): Promise<Apprenant> {
    return await this.apprenantModel.findByIdAndUpdate(id, update).exec();
  }
  /**
   * delete apprenant
   */
  async deleteApp(id: string): Promise<Apprenant> {
    return await this.apprenantModel.findByIdAndDelete(id).exec();
  }

  async updateValidation(id: string): Promise<Apprenant> {
    const app = await this.apprenantModel.findById(id);
    app.isValid = !app.isValid;
    return this.apprenantModel.findByIdAndUpdate(id, app);
  }
  async affecteFormation(id: string, idF: string) {
    const apprenant = await this.apprenantModel.findById(id);
    apprenant.formations.push(idF);
    return await this.apprenantModel.findByIdAndUpdate(id, apprenant).exec();
  }

  async login(tokenDto: TokenADto) {
    const app = await this.apprenantModel.findOne({
      email: tokenDto.email,
      password: tokenDto.password,
    });

    if (!app) {
      return null;
    } else {
      if (app) {
        const token = jwt.sign({ data: app }, 'mhatlioussema');
        return token;
      }
    }
  }

  createJwtPayload(app) {
    const data: JwtPayloadA = {
      password: app.password,
      email: app.email,
      _id: app._id,
      isValid: app.isValid,
      name: app.name,
      tel: app.tel,
      lastname: app.lastname,
      logo: app.logo,
      spec: app.spec,
      idR: app.idR,
    };

    const jwt = this.jwtService.sign(data);

    return jwt;
  }
  async validateUserByJwt(payload: JwtPayloadA) {
    const app = await this.apprenantModel.findOne({
      email: payload.email,
      password: payload.password,
      isValid: payload.isValid,
    });

    if (app) {
      return this.createJwtPayload(app);
    } else {
      throw new UnauthorizedException();
    }
  }
  async ajouterId(idA: string, idroom: any): Promise<any> {
    const app = await this.apprenantModel.findById(idA);
    app.idR.push(idroom);
    return await this.apprenantModel.findByIdAndUpdate(idA, app).exec();
  }
  async findByRoom(idR): Promise<Apprenant[]> {
    return await this.apprenantModel.find({ idR }).exec();
  }
  //count bl month year ll admin
  async countByMonth(mois, year) {
    return this.apprenantModel
      .find({
        mois: mois,
        year: year,
      })
      .count()
      .exec();
  }
}
