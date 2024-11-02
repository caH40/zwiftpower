import mongoose, { Schema, model } from 'mongoose';

import { TNotifications, UserSchema } from '../types/model.interface.js';

const notificationsSchema = new Schema<TNotifications>(
  {
    development: { type: Boolean, default: true }, // Оповещение на email об изменениях на сайте.
    events: { type: Boolean, default: true }, // Оповещение на email об новых Эвентах.
    news: { type: Boolean, default: true }, // Оповещение на email о новостях.
  },
  { _id: false }
);

const userSchema = new Schema<UserSchema>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider' },
  zwiftId: Number,
  zwiftIdAdditional: [{ type: Number }],
  telegramId: { type: Number },
  date: { type: Number },
  email: { type: String, unique: true, required: true },
  emailConfirm: { type: Boolean, default: false },
  phone: { type: String },
  firstName: { type: String },
  patronymic: { type: String },
  lastName: { type: String },
  zwiftData: {
    firstName: String,
    lastName: String,
    category: String,
    categoryWomen: String,
    ftp: Number,
    weight: Number,
    height: Number,
    age: Number,
    countryAlpha3: String,
    imageSrc: String,
    male: Boolean,
    publicId: String,
    racingScore: Number,
  },
  category: String,
  gender: { type: String },
  birthday: { type: Number },
  city: { type: String },
  team: { type: String },
  role: { type: String },
  moderator: { clubs: [String] },
  photoFromZp: { type: Boolean },
  photoProfile: { type: String },
  bio: { type: String },
  notifications: { type: notificationsSchema },
});

export const User = model('User', userSchema);
