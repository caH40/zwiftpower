import mongoose, { Schema, Document } from 'mongoose';
import { TAuthToken } from '../types/model.interface.js';

const TokenSchema: Schema<TAuthToken> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    authService: {
      type: String,
      enum: ['vk', 'yandex', 'credential'], // Ограничение значений поля
      required: true,
    },
    device: {
      deviceId: { type: String, required: true },
      userAgent: { type: String },
      platform: { type: String },
      language: { type: String },
      screenResolution: { type: String },
    },
    tokens: {
      accessToken: { type: String, required: true },
      refreshToken: { type: String, required: true },
    },
    location: {
      ip: { type: String },
      city: { type: String },
      region: { type: String },
      country: { type: String },
      timezone: { type: String },
    },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const TokenAuthModel = mongoose.model<TAuthToken & Document>('TokenAuth', TokenSchema);
