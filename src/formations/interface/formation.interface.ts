import { Document, Types } from 'mongoose';
import { Chapitre } from 'src/chapiters/interface/chapitre.interface';
import {Categori} from "../../categoris/interface/categori.interface";

export interface Formation extends Document {
  name: string;
  desc: string;
  cat: string;
  nbrH: number;
  dateDepot: Date;
  month: number;
  year: number;

  urlimg: string;
  chapitre: Chapitre[];

}
