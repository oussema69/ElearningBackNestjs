import { Document } from 'mongoose';

import { Schema ,Types} from 'mongoose';
import { Fichier } from 'src/files/interface/file.interface';
export interface Ressource extends Document {
  
  titre: String;
  desc: String;
  idch: String;
  fic:String;
  type:String;
}
