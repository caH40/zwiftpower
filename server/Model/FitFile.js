import { Schema, model } from 'mongoose';

const fitFileSchema = new Schema({
  zwiftId: { type: Number, unique: true },
  dateLastedActivity: { type: Number, default: null },
  dateUpdate: { type: Number },
  activities: [
    {
      name: { type: String, default: null },
      date: { type: Number, default: null },
      powerInWatts: { type: String },
      weightInGrams: { type: Number, default: null },
      _id: false,
    },
  ],
});

export const FitFile = model('FitFile', fitFileSchema);
