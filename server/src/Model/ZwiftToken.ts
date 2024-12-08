import mongoose, { Document, Schema, model } from 'mongoose';

import { TZwiftToken } from '../types/model.interface.js';

/**
 * Схема для Zwift token бота-модератора клуба в Звифт.
 */
const zwiftTokenSchema = new Schema<TZwiftToken>(
  {
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer' },
    token: { type: String, required: true },
    username: { type: String, required: true },
    importance: { type: String, enum: ['main', 'secondary'] },
  },
  { timestamps: true }
);

export const ZwiftToken = model<TZwiftToken & Document>('ZwiftToken', zwiftTokenSchema);
