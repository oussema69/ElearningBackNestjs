import { Schema } from 'mongoose';

export const NotifDetailsSchema = new Schema({
  title: String,
  name: String,
  visible: Boolean,
  idApp: String,
  idF: String,
  date: { type: Date, default: Date.now() },
  dateaff: Date,
});
