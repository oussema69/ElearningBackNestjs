import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { Notification } from '../notification/models/models';
import { Message } from './model/message.model';
import { NotificationDto } from '../notification/dto/Notification.Dto';
import { MessageDto } from './dto/message.dto';
import { Visio } from '../visio/model/visio';


@Injectable()
export class MessageService {
  constructor(
    @InjectModel('message')
    private readonly messageModel: Model<Message>,
  ) {}
  async createMsg(message: MessageDto): Promise<Message> {
    return await new this.messageModel({
      ...message,
      createdAt: new Date(),
    }).save();
  }
  async pushmsg(id: string, mess: string, ids: string): Promise<any> {
    const msg = await this.messageModel.findById(id);
    const messages = { msg: mess, ids: ids, visible: true };
    msg.messages.push(messages);
    return this.messageModel.findByIdAndUpdate(id, msg);
  }
  async verif(idS, idR): Promise<Message> {
    return await this.messageModel
      .findOne({ idS: idS, idR: idR })

      .exec();
  }

  //get by id s
  async findByids(idS, idR): Promise<Message> {
    return await this.messageModel
      .findOne({ idS: idS, idR: idR })
      .sort({ dateDepot: 'descending' })
      .exec();
  }
  async findconvbyform(idf): Promise<number> {
    let nbmsg = 0;
    const allmsg = await this.messageModel.find({
      $or: [{ idR: idf }, { idS: idf }],
    });
    console.log(allmsg);
    console.log(idf);
    if (allmsg.length > 0) {
      await allmsg.forEach((i) => {
        if (
          i.messages[i.messages.length - 1].ids != idf &&
          i.messages[i.messages.length - 1].visible == true
        ) {
          nbmsg++;
        }
      });
    }
    console.log(nbmsg);
    console.log('chbyky a mama w5aytu');
    return nbmsg;
  }
  async findvisbysender(idM, idApp): Promise<number> {
    let nbmsg = 0;
    const allmsg = await this.messageModel.findById(idM);

    if (allmsg.messages.length > 0) {
      await allmsg.messages.forEach((i) => {
        if (i.ids == idApp && i.visible == true) {
          nbmsg++;
        }
      });
    }
    console.log(nbmsg);
    console.log('chbyky a mama w5aytu');
    return nbmsg;
  }
  async updateVis(idf): Promise<any> {
    const allmsg = await this.messageModel.find({
      $or: [{ idR: idf }, { idS: idf }],
    });
    if (allmsg.length > 0) {
      await allmsg.forEach(async (i) => {
        if (
          i.messages[i.messages.length - 1].ids != idf &&
          i.messages[i.messages.length - 1].visible == true
        ) {
          i.messages[i.messages.length - 1].visible = false;
          console.log(i.messages[i.messages.length - 1].visible);
          await this.messageModel.findByIdAndUpdate(i._id, i);
        }
      });
    }
    return await this.messageModel.find({
      $or: [{ idR: idf }, { idS: idf }],
    });
  }
  async updatevisbysender(idM, idApp) {
    const allmsg = await this.messageModel.findById(idM);

    if (allmsg.messages.length > 0) {
      await allmsg.messages.forEach((i) => {
        if (i.ids == idApp && i.visible == true) {
          i.visible = false;
        }
      });
      await this.messageModel.findByIdAndUpdate(idM, allmsg);
    }
  }
}
