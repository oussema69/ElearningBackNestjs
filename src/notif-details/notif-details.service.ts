import { Injectable } from '@nestjs/common';
import { Model, Schema } from 'mongoose';
import { NotifDetails } from './models/model';
import { InjectModel } from '@nestjs/mongoose';
import { FormationDto } from '../formations/dto/formation.dto';
import { NotifDetailsDto } from './dto/notifDetails.dto';
import { NotificationDto } from '../notification/dto/Notification.Dto';
import { ApprenantDto } from '../apprenants/dto/apprenant.dto';
import { Apprenant } from '../apprenants/interface/apprenant.interface';

@Injectable()
export class NotifDetailsService {
  constructor(
    @InjectModel('notifDetails')
    private readonly notifModel: Model<NotifDetails>,
  ) {}
  async createForm(notification: NotifDetailsDto): Promise<NotifDetails> {
    return await new this.notifModel({
      ...notification,
    }).save();
  }
  async findAllNotification(): Promise<NotifDetails[]> {
    return await this.notifModel.find().exec();
  }
  async findByvis(visible, idApp): Promise<NotifDetails[]> {
    return await this.notifModel.find({ visible, idApp }).exec();
  }
  async findByvisF(visible, idF): Promise<NotifDetails[]> {
    return await this.notifModel.find({ visible, idF }).exec();
  }
  async getByidApp(idApp): Promise<NotifDetails[]> {
    const not = await this.notifModel
      .find({ idApp })
      .sort({ dateaff: 'descending' })
      .exec();

    return not;
  }
  async getByIdF(idF): Promise<NotifDetails[]> {
    return await this.notifModel
      .find({ idF })
      .sort({ dateaff: 'descending' })
      .exec();
  }
  async updateVis(idApp): Promise<any> {
    return this.notifModel.updateMany({ idApp }, { visible: 'false' });
  }
  async updateVisF(idF): Promise<any> {
    return this.notifModel.updateMany({ idF }, { visible: 'false' });
  }
}
