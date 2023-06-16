import pkg from 'mongoose';

const { Schema, model } = pkg;

const powerCurveSchema = new Schema({
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

export const PowerCurve = model('PowerCurve', powerCurveSchema);
