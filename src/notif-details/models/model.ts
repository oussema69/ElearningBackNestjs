import { Document } from 'mongoose';

export interface NotifDetails extends Document {
  title: string;
  name: string;
  visible: boolean;
  idApp: string;
  idF:string;
  date: Date;

}
