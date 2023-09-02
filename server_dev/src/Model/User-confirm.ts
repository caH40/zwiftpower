import { Schema, model } from 'mongoose';

import { TotalCatchupSchema } from '../types/model.interface.js';

const userConfirmSchema = new Schema<TotalCatchupSchema>({
  userId: { type: String, unique: true, required: true },
  date: { type: Number, required: true },
  activationToken: { type: String, required: true },
  email: { type: String, required: true },
});

export const UserConfirm = model<TotalCatchupSchema>('UserConfirm', userConfirmSchema);
