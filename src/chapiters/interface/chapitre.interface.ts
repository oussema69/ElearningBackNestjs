import { Document } from 'mongoose';
import { Ressource } from 'src/formations/models/models';
import { RessourceDto } from 'src/ressources/dto/ressource.dto'; 

export interface Chapitre extends Document {
   name: string;
  desc: string;
  formation: string;
  visible:boolean;
}
