import { Schema } from 'mongoose';

export const VisioSchema = new Schema({
  idR: String,
  name: String,
  date: Date,
  dure: Number,
  month: Number,
  year: Number,
  idApp: [],
  idF: String,
});
