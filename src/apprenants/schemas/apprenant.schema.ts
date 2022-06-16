import { Schema } from 'mongoose';

export const ApprenantSchema = new Schema({
  name: String,
  lastname: String,
  tel: Number,
  isValid: { type: Boolean, default: true },
  email: String,
  password: { type: String, default: 'changeMe' },
  formations: [],
  logo: String,
  idR: [],
  date: { type: Date, default: Date.now() },
  mois: Number,
  year: Number,
});
