import { Document } from 'mongoose';

export interface Apprenant extends Document {
  name: String;
  lastname: String;
  tel: Number;
  isValid: Boolean;
  email: string;
  password: String;
  formations:string[];
  logo:string;
  idR: string[];
  mois: number;
  year: number;

}
