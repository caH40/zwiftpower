import mongoose, { Document, Schema, Types, model } from 'mongoose';
import {
  TCriticalPowerBestEfforts,
  TDisqualification,
  TGapsInCategories,
  TStagePenalty,
  TStageResult,
} from '../types/model.interface.js';
import {
  DISQUALIFICATION_LABELS,
  RACE_SERIES_CATEGORIES,
  ZWIFT_CATEGORIES,
} from '../assets/constants.js';
import { pointsStageResultSchema } from './Schema/Points.js';

// Интерфейс для результата этапа
export interface IStageResult extends Omit<TStageResult, '_id'>, Document {
  _id: Types.ObjectId;
}

// Схема профиля райдера
export const profileDataSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String },
    weightInGrams: { type: Number },
    heightInCentimeters: { type: Number },
    imageSrc: { type: String, default: null },
    countryAlpha3: { type: String },
    age: { type: Number },
  },
  { _id: false }
);

// Схема CP Best Efforts
const cpBestEffortsSchema = new Schema<TCriticalPowerBestEfforts>(
  {
    watts: { type: Number },
    wattsKg: { type: Number },
    cpLabel: { type: String },
    duration: { type: Number },
  },
  { _id: false }
);

// Схема дисквалификации
export const disqualificationSchema = new Schema<TDisqualification>(
  {
    status: { type: Boolean, default: false }, // Статус дисквалификации.
    reason: { type: String }, // Причина дисквалификации (опционально).
    label: { type: String, enum: DISQUALIFICATION_LABELS }, // Краткий код статуса .
    moderator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifiedAt: { type: Date },
  },
  { _id: false }
);

// Схема штрафа.
const penaltySchema = new Schema<TStagePenalty>(
  {
    reason: { type: String, trim: true }, // Причина штрафа.
    timeInMilliseconds: { type: Number }, // Время штрафа.
    moderator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifiedAt: { type: Date },
  },
  { _id: false }
);
// Схема штрафа.
const sensorDataSchema = new Schema(
  {
    avgWatts: Number,
    heartRateData: { avgHeartRate: Number, heartRateMonitor: Boolean },
    pairedSteeringDevice: Boolean,
    powerType: String,
    trainerDifficulty: Number,
  },
  { _id: false }
);

// Отрывы между участником результата и лидером, предыдущим в абсолюте и категориях.
export const GapsInCategoriesSchema = new Schema<TGapsInCategories>(
  {
    category: { type: { toLeader: Number, toPrev: Number }, default: null, _id: false },
    absolute: { type: { toLeader: Number, toPrev: Number }, default: null, _id: false },
  },
  { _id: false }
);

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
    gapsInCategories: GapsInCategoriesSchema,
    points: { type: pointsStageResultSchema, default: null },
    disqualification: { type: disqualificationSchema, default: null },
    penalty: { type: [penaltySchema], default: null },
    teamSquadAtRace: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamSquad', default: null },
  },
  { timestamps: true }
);

export const StageResultModel = model<IStageResult>('StageResult', stageResultSchema);
