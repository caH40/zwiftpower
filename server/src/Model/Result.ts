import mongoose, { Schema, model } from 'mongoose';

import { ResultSchema } from '../types/model.interface.js';

const resultSchema = new Schema<ResultSchema>({
  stageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stage' },
  riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider' },
  zwiftEventId: { type: mongoose.Schema.Types.ObjectId, ref: 'ZwiftEvent' },
  subgroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'ZwiftEventSubgroup' },
  zwiftRiderId: { type: Number },
  name: String,
  placeAbsolute: Number,
  wattPerKg: Number,
  watt: Number,
  time: Number,
  penalty: { powerUp: { type: Number, default: 0 } },
  isDisqualification: { type: Boolean, default: false },
  isDidNotFinish: { type: Boolean, default: false },
  category: String,
  categoryCurrent: String,
  teamCurrent: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  isNeedCount: { type: Boolean, default: true },
  pointsStage: { type: Number, default: 0 },
  pointsStageOldW: { type: Number },
  pointsSprint: [
    {
      stageNumber: { type: Number },
      sprint: { type: Number },
      place: { type: String },
      points: { type: Number, default: 0 },
      multiplier: { type: Number, default: 1 },
      _id: false,
    },
  ],
  pointsMountain: [
    {
      stageNumber: { type: Number },
      mountain: { type: Number },
      place: { type: String },
      points: { type: Number, default: 0 },
      multiplier: { type: Number, default: 1 },
      _id: false,
    },
  ],
  isUnderChecking: { type: Boolean, default: false },
  comment: String,
  weightInGrams: Number,
  heightInCentimeters: Number,
  avgHeartRate: Number,
  gender: String,
  imageSrc: String,
  addedManually: { type: Boolean },
});

export const Result = model<ResultSchema>('Result', resultSchema);
