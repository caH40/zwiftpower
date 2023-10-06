import { Schema, model } from 'mongoose';

import { PowerCurveSchema } from '../types/model.interface.js';

// лучшие показатели мощности и удельной мощности на последние 90 дней
const powerCurveSchema = new Schema<PowerCurveSchema>({
  zwiftId: { type: Number, required: true, unique: true },
  isMale: { type: Boolean, default: true },
  date: { type: Number, default: null },
  pointsWatts: [
    {
      isVirtualPower: { type: Boolean, default: false },
      duration: { type: Number, default: null },
      value: { type: Number, default: null },
      date: { type: Number, default: null },
      name: { type: String, default: null },
      _id: false,
    },
  ],
  pointsWattsPerKg: [
    {
      isVirtualPower: { type: Boolean, default: false },
      duration: { type: Number, default: null },
      value: { type: Number, default: null },
      date: { type: Number, default: null },
      name: { type: String, default: null },
      _id: false,
    },
  ],
});

export const PowerCurve = model<PowerCurveSchema>('PowerCurve', powerCurveSchema);
