import { Document } from 'mongoose';

export interface Formateur extends Document {
  name: string;
  lastname: string;
  tel: number;
  isValid: boolean;
  email: string;
  password: string;
  logo: string;
  spec: string;
  idR: string[];
  mois: number;
  year: number;
}
