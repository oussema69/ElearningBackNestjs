import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './models/models';
import { NotificationDto } from './dto/Notification.Dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<Notification>,
  ) {}
  async createForm(notification: NotificationDto): Promise<Notification> {
    return await new this.notificationModel({
      ...notification,
      createdAt: new Date(),
    }).save();
  }
  async findBytoken(idApp): Promise<Notification> {
    return await this.notificationModel.findOne({ idApp }).exec();
  }
  async deleteApp(id: string): Promise<any> {
    return await this.notificationModel.findByIdAndDelete(id).exec();
  }
}
