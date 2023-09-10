import { Schema, model } from 'mongoose';

import { PasswordResetSchema } from '../types/model.interface.js';

const passwordResetSchema = new Schema<PasswordResetSchema>({
  userId: { type: String, required: true },
  date: { type: Number, required: true },
  tokenReset: { type: String, required: true },
  email: { type: String, required: true },
});

export const PasswordReset = model<PasswordResetSchema>('PasswordReset', passwordResetSchema);
