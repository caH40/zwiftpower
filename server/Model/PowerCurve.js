import pkg from 'mongoose';

const { Schema, model } = pkg;

const powerCurveSchema = new Schema({
  zwiftId: { type: Number, required: true, unique: true },
  dateLastRace: { type: Number, default: null },
  pointsWatts: [
    {
      duration: { type: Number, default: null },
      value: { type: Number, default: null },
      date: { type: Number, default: null },
    },
  ],
  pointsWattsPerKg: [
    {
      duration: { type: Number, default: null },
      value: { type: Number, default: null },
      date: { type: Number, default: null },
    },
  ],
});

export const PowerCurve = model('PowerCurve', powerCurveSchema);
