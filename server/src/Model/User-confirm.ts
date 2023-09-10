import { Schema, model } from 'mongoose';

import { UserConfirmSchema } from '../types/model.interface.js';

const userConfirmSchema = new Schema<UserConfirmSchema>({
  userId: { type: String, unique: true, required: true },
  date: { type: Number, required: true },
  activationToken: { type: String, required: true },
  email: { type: String, required: true },
});

export const UserConfirm = model<UserConfirmSchema>('UserConfirm', userConfirmSchema);
