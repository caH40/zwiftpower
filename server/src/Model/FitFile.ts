import { Schema, model } from 'mongoose';

import { FitFileSchema } from '../types/model.interface.js';

const fitFileSchema = new Schema<FitFileSchema>({
  zwiftId: { type: Number, unique: true },
  dateLastedActivity: { type: Number, default: null },
  dateUpdate: { type: Number },
  activities: [
    {
      isVirtualPower: { type: Boolean, default: false },
      name: { type: String, default: null },
      eventId: { type: Number, default: null },
      date: { type: Number, default: null },
      powerInWatts: { type: String },
      weightInGrams: { type: Number, default: null },
      banned: { type: Boolean, default: false },
    },
  ],
});

export const FitFile = model<FitFileSchema>('FitFile', fitFileSchema);
