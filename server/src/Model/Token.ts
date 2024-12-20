import mongoose, { Schema, model } from 'mongoose';

import { TokenSchema } from '../types/model.interface.js';

const tokenSchema = new Schema<TokenSchema>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // credentialTokens: {
  //   refreshToken: { type: String, required: true },
  // },
  refreshToken: { type: String },

  // Авторизация через сторонние сервисы.
  externalTokens: {
    vk: [
      {
        deviceId: { type: String, required: true },
        refreshToken: { type: String, required: true },
        accessToken: { type: String, required: true },
        state: { type: String },
        scope: { type: String },
        expiresIn: { type: Number },
        issuedAt: { type: Date, default: Date.now },
      },
    ],
  },
});

export const Token = model<TokenSchema>('Token', tokenSchema);
