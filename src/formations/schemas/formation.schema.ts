import { Types, Schema } from 'mongoose';
export const FormationSchema = new Schema({
  name: String,
  desc: String,
  cat: String,
  nbrH: Number,
  dateDepot: { type: Date, default: Date.now() },
  month: Number,
  year: Number,
  urlimg: String,
  chapitre: [],
  apprenants: [],
});
