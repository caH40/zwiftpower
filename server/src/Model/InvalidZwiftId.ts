import { Schema, model } from 'mongoose';

// types
import { TInvalidZwiftIdDocument } from '../types/model.interface';

const InvalidZwiftIdSchema = new Schema<TInvalidZwiftIdDocument>({
  zwiftId: { type: Number, required: true, unique: true },
  reason: { type: String, default: null },
  lastCheckedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const InvalidZwiftIdModel = model<TInvalidZwiftIdDocument>(
  'InvalidZwiftId',
  InvalidZwiftIdSchema
);
