import mongoose, { Document, Schema, Types, model } from 'mongoose';

import { RACE_SERIES_CATEGORIES, ZWIFT_CATEGORIES } from '../assets/constants.js';
import { pointsStageResultSchema } from './Schema/Points.js';
import { finishersCountSchema } from './Schema/FinishersCountSchema.js';
import { profileDataSchema } from './Schema/ProfileDataSchema.js';
import { disqualificationSchema } from './Schema/DisqualificationSchema.js';
import { sensorDataSchema } from './Schema/sensorDataSchema.js';
import { penaltySchema } from './Schema/PenaltySchema.js';
import { gapsInCategoriesSchema } from './Schema/GapsInCategoriesSchema.js';
import { cpBestEffortsSchema } from './Schema/CpBestEffortsSchema.js';

// types
import { TStageResult } from '../types/model.interface.js';

// Интерфейс для результата этапа
export interface IStageResult extends Omit<TStageResult, '_id'>, Document {
  _id: Types.ObjectId;
}

// Основная схема результата этапа
const stageResultSchema = new Schema<IStageResult>(
  {
    series: { type: mongoose.Schema.Types.ObjectId, ref: 'NSeries', required: true },
    order: { type: Number, required: true },
    profileId: { type: Number, required: true },
    profileData: { type: profileDataSchema },
    cpBestEfforts: [cpBestEffortsSchema],
    activityData: {
      durationInMilliseconds: { type: Number },
      subgroupLabel: { type: String, enum: ZWIFT_CATEGORIES },
      segmentDistanceInCentimeters: { type: Number },
      segmentDistanceInMeters: { type: Number },
      elevationInMeters: { type: Number },
      calories: { type: Number },
      endDate: { type: String },
    },
    sensorData: sensorDataSchema,
    category: {
      type: String,
      enum: RACE_SERIES_CATEGORIES,
    },
    categoryInRace: {
      type: String,
      enum: RACE_SERIES_CATEGORIES,
      default: null,
    },
    modifiedCategory: {
      value: { type: String },
      moderator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      modifiedAt: { type: Date },
      reason: { type: String },
    },
    rank: {
      category: { type: Number, default: 0 },
      absolute: { type: Number, default: 0 },
    },
    gapsInCategories: { type: gapsInCategoriesSchema },
    points: { type: pointsStageResultSchema, default: null },
    disqualification: { type: disqualificationSchema, default: null },
    penalty: { type: [penaltySchema], default: null },
    teamSquadAtRace: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamSquad', default: null },
    finishersCount: { type: finishersCountSchema },
  },
  { timestamps: true }
);

export const StageResultModel = model<IStageResult>('StageResult', stageResultSchema);
