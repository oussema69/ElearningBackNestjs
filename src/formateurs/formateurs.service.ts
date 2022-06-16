import {
  HttpService,
  Injectable,
  Post,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormateurDto } from './dto/formateur.dto';
import { Formateur } from './interface/formateur.interface';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { TokenFDto } from './dto/token.dto';
import { JwtPayloadF } from './interface/jwt-payload.interface';
import { Observable } from 'rxjs';
import { subscribe } from 'graphql';
import { Visio } from '../visio/model/visio';

@Injectable()
export class FormateursService {
  constructor(
    @InjectModel('Formateurs')
    private readonly formateurModel: Model<Formateur>,
    @InjectModel('Visio')
    private readonly VisioModel: Model<Visio>,
    private jwtService: JwtService,
    private http: HttpService,
  ) {}

  async createF(formateur: FormateurDto): Promise<Formateur> {
    if (!(await this.findOneFemail(formateur.email))) {
      return await new this.formateurModel({
        ...formateur,
        createdAt: new Date(),
      }).save();
    } else {
      throw new UnprocessableEntityException('formateur already exists.');
    }
  }

  /**
   * Find all formateur
   */
  async findAllF(): Promise<Formateur[]> {
    return this.formateurModel.find().sort({ date: 'descending' }).exec();
  }

  /**
   * Find formateur by name
   */
  async findOneF(name): Promise<Formateur> {
    return this.formateurModel.findOne({ name }).exec();
  }

  /**
   * Find formateur by email
   */
  async findOneFemail(email): Promise<Formateur> {
    return this.formateurModel.findOne({ email }).exec();
  }

  /**
   * find formateur by formateur
   */

  async findOne(id: string): Promise<any> {
    return await this.formateurModel.findById(id).exec();
  }

  /**
   * update formateur
   */
  async updateF(id: string, update: FormateurDto): Promise<Formateur> {
    return await this.formateurModel.findByIdAndUpdate(id, update).exec();
  }

  /**
   * delete formateur
   */
  async deleteF(id: string): Promise<Formateur> {
    return await this.formateurModel.findByIdAndDelete(id).exec();
  }

  async findByspec(spec): Promise<Formateur[]> {
    return await this.formateurModel.find({ spec }).exec();
  }

  async updateValidation(id: string): Promise<Formateur> {
    const app = await this.formateurModel.findById(id);
    app.isValid = !app.isValid;
    return this.formateurModel.findByIdAndUpdate(id, app);
  }

  async login(tokenDto: TokenFDto) {
    const formateur = await this.formateurModel.findOne({
      email: tokenDto.email,
      password: tokenDto.password,
    });

    if (!formateur) {
      return null;
    } else {
      if (formateur) {
        const token = jwt.sign({ data: formateur }, 'mhatlioussema');
        return token;
      }
    }
  }

  createJwtPayload(formateur) {
    const data: JwtPayloadF = {
      password: formateur.password,
      email: formateur.email,
      _id: formateur._id,
      isValid: formateur.isValid,
      name: formateur.name,
      tel: formateur.tel,
      lastname: formateur.lastname,
      logo: formateur.logo,
      spec: formateur.spec,
      idR: formateur.idR,
    };

    const jwt = this.jwtService.sign(data);

    return jwt;
  }

  async validateUserByJwt(payload: JwtPayloadF) {
    const formateur = await this.formateurModel.findOne({
      email: payload.email,
      password: payload.password,
      isValid: payload.isValid,
    });

    if (formateur) {
      return this.createJwtPayload(formateur);
    } else {
      throw new UnauthorizedException();
    }
  }
  //tasna3 room
  async createRoom(nom: string, desc: string, date: string, duration: number) {
    const url = 'https://api.enablex.io/video/v2/rooms';
    const data = {
      name: nom,
      owner_ref: 'firstStep',
      settings: {
        description: desc,
        mode: 'group',
        scheduled: true,
        adhoc: false,
        scheduled_time: date,
        duration: duration,
        moderators: '1',
        participants: '30',
        quality: 'HD',
        abwd: true,
      },
    };
    const token = Buffer.from(
      `${'625c8d9c72b4a1568e0010d4'}:${'ehyZyYaGeRuYuPyUaWetuqupuAyvunaXeJy7'}`,
      'utf8',
    ).toString('base64');
    const res = await this.http.post(url, data, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
    return res;
  }
  //te5dh les room lkol
  async getAllRooms() {
    const url = 'https://api.enablex.io/video/v2/rooms';

    const token = Buffer.from(
      `${'625c8d9c72b4a1568e0010d4'}:${'ehyZyYaGeRuYuPyUaWetuqupuAyvunaXeJy7'}`,
      'utf8',
    ).toString('base64');
    const res = await this.http.get(url, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });

    return res;
  }

  //te5dh room bl id
  async getRoomById(idR): Promise<Observable<any>> {
    const token = Buffer.from(
      `${'625c8d9c72b4a1568e0010d4'}:${'ehyZyYaGeRuYuPyUaWetuqupuAyvunaXeJy7'}`,
      'utf8',
    ).toString('base64');

    const res = await this.http.get(
      `${'https://api.enablex.io/video/v2/rooms'}/${idR}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    );
    return res;
  }
  async delete(idR): Promise<Observable<any>> {
    const token = Buffer.from(
      `${'625c8d9c72b4a1568e0010d4'}:${'ehyZyYaGeRuYuPyUaWetuqupuAyvunaXeJy7'}`,
      'utf8',
    ).toString('base64');

    const res = await this.http.delete(
      `${'https://api.enablex.io/video/v2/rooms'}/${idR}`,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    );
    return res;
  }
  async update(
    idR,
    nom: string,
    desc: string,
    date: string,
    duration: number,
  ): Promise<Observable<any>> {
    const token = Buffer.from(
      `${'625c8d9c72b4a1568e0010d4'}:${'ehyZyYaGeRuYuPyUaWetuqupuAyvunaXeJy7'}`,
      'utf8',
    ).toString('base64');
    const data = {
      name: nom,
      owner_ref: 'firstStep',
      settings: {
        description: desc,
        mode: 'group',
        scheduled: true,
        adhoc: false,
        scheduled_time: date,
        duration: duration,
        moderators: '1',
        participants: '30',
        quality: 'HD',
        abwd: true,
      },
    };
    const res = await this.http.patch(
      `${'https://api.enablex.io/video/v2/rooms'}/${idR}`,
      data,
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    );
    return res;
  }
  //te5dh id e romm w tjyb les formateur li 3andhom l id adheka
  async findByRoom(idR): Promise<Formateur[]> {
    return await this.formateurModel.find({ idR }).exec();
  }
  //te5dh id formateur w tgetylou roometou
  async getRommByFor(idF) {
    const formateur = await this.findOne(idF);
    return formateur.idR;
  }
  async getforByroom(idR, idF) {
    const formateur = this.formateurModel.find().exec();
  }
  async getByidR(idR: string) {
    return this.VisioModel.findOne({ idR });
  }
  /*
  async ajouterId(idF: string, idr: string) {
    const formateur = await this.formateurModel.findById(idF);
    const room = await this.getByidR(idr);
    const alRom = formateur.idR;

    if (alRom.length >= 0) {
      if (alRom.length == 0) {
        formateur.idR.push(idr);
        return await this.formateurModel
          .findByIdAndUpdate(idF, formateur)
          .exec();
      } else {
        for (const r of alRom) {
          const cr = await this.getByidR(r);
          const datecr = new Date(cr.date);
          const dateR = new Date(room.date);
          datecr.setMinutes(datecr.getMinutes() + cr.dure);
          if (datecr > dateR) {
            throw new UnprocessableEntityException('non dispo');
          } else {
            formateur.idR.push(idr);
            return await this.formateurModel
              .findByIdAndUpdate(idF, formateur)
              .exec();
          }
        }
      }
    }
  }
*/
  //tajouty id room fl formateur

  async ajouterId(idF: string, idroom: any): Promise<any> {
    const formateur = await this.formateurModel.findById(idF);

    const f = await this.findByRoom(idroom);

    if (f.length == 0) {
      formateur.idR.push(idroom);
      return await this.formateurModel.findByIdAndUpdate(idF, formateur).exec();
    } else {
      throw new UnprocessableEntityException('deja affecter');
    }
  }

  /*
  async ajouterId(idF: string, idroom: any): Promise<any> {
    const formateur = await this.formateurModel.findById(idF);
    let verif: boolean;
    const f = await this.findByRoom(idroom);
    const allRooms = formateur.idR;
    let newRoom: Room;
    let existRoom: Room;
    if (f.length == 0) {
      if (allRooms.length == 0) {
        formateur.idR.push(idroom);

        return await this.formateurModel
          .findByIdAndUpdate(idF, formateur)
          .exec();
      } else {
        (await this.getRoomById(idroom)).subscribe((res) => {
          newRoom = res.data.room;
          allRooms.forEach(
            async function (i) {
              await (
                await this.getRoomById(i)
              ).subscribe(async (data) => {
                existRoom = data.data.room;


                if (
                  newRoom.settings.scheduled_time ===
                  existRoom.settings.scheduled_time
                ) {
                  RT.push(0);
                } else {

                  RT.push(1);
                }
                if (RT.indexOf(0) == -1) {
                  formateur.idR.push(idroom);

                  await this.formateurModel
                    .findByIdAndUpdate(idF, formateur)
                    .exec();
                  verif = true;
                } else {
                  verif = false;
                }
              });
            }.bind(this),
          );
        });
      }
    } else {
      throw new UnprocessableEntityException('deja affecter');
    }
    return verif;
  }
*/

  async countByMonth(mois, year) {
    return this.formateurModel
      .find({
        mois: mois,
        year: year,
      })
      .count()
      .exec();
  }
}
interface Room {
  name: string;
  service_id: string;
  owner_ref: string;
  settings: {
    description: string;
    mode: string;
    scheduled: boolean;
    scheduled_time: string;
    adhoc: boolean;
    duration: string;
    participants: string;
    auto_recording: boolean;
    screen_share: boolean;
    canvas: boolean;
    abwd: boolean;
    media_configuration: string;
    quality: string;
    moderators: string;
    viewers: number;
    active_talker: boolean;
    max_active_talkers: number;
    encryption: boolean;
    watermark: boolean;
    single_file_recording: boolean;
    media_zone: string;
  };
  created: string;
  isMediaServerAvailable: boolean;
  room_id: string;
  sip: {
    enabled: boolean;
  };
}
