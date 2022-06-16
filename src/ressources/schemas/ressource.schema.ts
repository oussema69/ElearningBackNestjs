import { Schema, Types } from 'mongoose';
import { FichierSchema } from 'src/files/schemas/file.schemas';
export const RessourceSchema = new Schema({
  titre: String,
  desc: String,
  idch: String,
  fic:String,
  type:String,
});
