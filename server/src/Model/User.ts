import mongoose, { Schema, model } from 'mongoose';

import {
  TExternalAccountVk,
  TNotifications,
  TUserStreams,
  UserSchema,
} from '../types/model.interface.js';

const notificationsSchema = new Schema<TNotifications>(
  {
    development: { type: Boolean, default: true }, // Оповещение на email об изменениях на сайте.
    events: { type: Boolean, default: true }, // Оповещение на email об новых Эвентах.
    news: { type: Boolean, default: true }, // Оповещение на email о новостях.
  },
  { _id: false }
);

// Схема для конфигурации стримов пользователя с разных ресурсов.
const streamsSchema = new Schema<TUserStreams>(
  {
    twitch: {
      channelName: { type: String },
      isEnabled: { type: Boolean },
    },
    youtube: {
      channelHandle: { type: String },
      isEnabled: { type: Boolean },
    },
    streamingRestricted: { type: Boolean, default: false },
  },
  { _id: false }
);

// Внешние аккаунты: VK, Yandex и т.д
const externalAccountsSchema = new Schema<{ vk?: TExternalAccountVk }>({
  vk: {
    id: { type: Number, require: true },
    firstName: String,
    lastName: String,
    avatarSrc: String,
    verified: Boolean,
    gender: { type: String, enum: ['male', 'female'] },
    birthday: String,
    email: String,
  },
});

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
  category: String,
  gender: { type: String },
  birthday: { type: Number },
  city: { type: String },
  team: { type: String },
  role: { type: String },
  moderator: { clubs: [String] },
  bio: { type: String },
  notifications: {
    type: notificationsSchema,
    default: () => ({}),
  },
  streams: {
    type: streamsSchema,
    default: () => ({
      twitch: { channelName: '', isEnabled: false },
      youtube: { channelHandle: '', isEnabled: false },
      streamingRestricted: false,
    }),
  },
  externalAccounts: { type: externalAccountsSchema },
});

export const User = model('User', userSchema);
