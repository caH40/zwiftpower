import { Schema, model } from 'mongoose';

import { PowerCurveSchema } from '../types/model.interface.js';

// лучшие показатели мощности и удельной мощности на последние 90 дней
const powerCurveSchema = new Schema<PowerCurveSchema>({
  zwiftId: { type: Number, required: true, unique: true },
  date: { type: Number, default: null },
  pointsWatts: [
    {
      duration: { type: Number, default: null },
      value: { type: Number, default: null },
      date: { type: Number, default: null },
      name: { type: String, default: null },
      _id: false,
    },
  ],
  pointsWattsPerKg: [
    {
      duration: { type: Number, default: null },
      value: { type: Number, default: null },
      date: { type: Number, default: null },
      name: { type: String, default: null },
      _id: false,
    },
  ],
});

export const PowerCurve = model<PowerCurveSchema>('PowerCurve', powerCurveSchema);