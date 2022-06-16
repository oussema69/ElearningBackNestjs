import { Schema, Types } from 'mongoose';

export const CategoriSchema = new Schema({
  name: String,
  logo: String,
  date: { type: Date, default: Date.now() },
});
