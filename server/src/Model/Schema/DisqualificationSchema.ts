import mongoose, { Schema } from 'mongoose';
import { DISQUALIFICATION_LABELS } from '../../assets/constants.js';

// types
import { TDisqualification } from '../../types/model.interface.js';

// Схема дисквалификации
export const disqualificationSchema = new Schema<TDisqualification>(
  {
    status: { type: Boolean, default: false }, // Статус дисквалификации.
    reason: { type: String }, // Причина дисквалификации (опционально).
    label: { type: String, enum: DISQUALIFICATION_LABELS }, // Краткий код статуса .
    moderator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifiedAt: { type: Date },
  },
  { _id: false }
);
