import mongoose, { Schema, model } from 'mongoose';

import { TotalCatchupSchema } from '../types/model.interface.js';

const userSchema = new Schema<TotalCatchupSchema>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider' },
  zwiftId: { type: Number },
  telegramId: { type: Number },
  date: { type: Number },
  email: { type: String, unique: true, required: true },
  emailConfirm: { type: Boolean, default: false },
  phone: { type: String },
  firstName: { type: String },
  patronymic: { type: String },
  lastName: { type: String },
  gender: { type: String },
  birthday: { type: Number },
  city: { type: String },
  team: { type: String },
  role: { type: String },
  photoFromZp: { type: Boolean },
  photoProfile: { type: String },
  bio: { type: String },
});

export const User = model<TotalCatchupSchema>('User', userSchema);
