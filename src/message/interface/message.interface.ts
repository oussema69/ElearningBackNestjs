import { Document } from 'mongoose';

export interface Message extends Document {
  idS: string;
  idR: string;
  messages: [{ msg: string; ids: string }];
  visible: boolean;

}
