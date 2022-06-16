import { Document } from 'mongoose';

export interface Categori extends Document {
  name: string;
  logo:string;
}
