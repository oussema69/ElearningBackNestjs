import { Schema } from 'mongoose';

export const MessagesSchema = new Schema({
  idS: String,
  idR: String,
  messages: [
    {
      msg: String,
      ids: String,
      dates: { type: Date, default: Date.now() },
      visible: { type: Boolean, default: true },
    },
  ],

  date: { type: Date, default: Date.now() },
});
