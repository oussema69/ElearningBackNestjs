import { Schema, Types } from 'mongoose';

export const ChapitreSchema = new Schema({
  name: String,
  desc: String,
  formation: String,
  visible: { type: Boolean, default: true },
});
