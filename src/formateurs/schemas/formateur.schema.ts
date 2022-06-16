import { Schema } from 'mongoose';

export const FormateurSchema = new Schema({
  name: String,
  lastname: String,
  tel: Number,
  logo: String,
  isValid: { type: Boolean, default: true },
  email: String,
  password: { type: String, default: 'changeMe' },
  spec: String,
  idR: [],
  date: { type: Date, default: Date.now() },
  mois: Number,
  year: Number,
});
