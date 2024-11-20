import mongoose, { Schema, model } from 'mongoose';
import { TRiderBannedSchema } from '../types/model.interface.js';

/**
 * Схема для забанных zwiftId с читерскими или постоянно глючными данными.
 * Данные zwiftId не участвуют во всех рейтинговых таблицах,
 * но кривая мощности для них рассчитывается.
 */
const BannedReason = {
  code: { type: String },
  description: { type: String },
  _id: false,
};
const riderBannedSchema = new Schema<TRiderBannedSchema>(
  {
    zwiftId: { type: Number, required: true },
    bannedReason: { type: BannedReason, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const RiderBanned = model<TRiderBannedSchema>('RiderBanned', riderBannedSchema);
