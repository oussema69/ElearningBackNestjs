import { Schema } from 'mongoose';

export const FichierSchema = new Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  buffer: {
    type: Buffer,
    data: [],
  },
  size: Number,
});
