import mongoose, { Schema, model } from 'mongoose';

import { TokenSchema } from '../types/model.interface.js';

const tokenSchema = new Schema<TokenSchema>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, require: true },
});

export const Token = model<TokenSchema>('Token', tokenSchema);
