import { Schema } from 'mongoose';

export const NotificationSchema = new Schema({
  idApp: String,
  token: String,
});
