import mongoose, { Document, Schema, Types, model } from 'mongoose';
import {
  TCriticalPowerBestEfforts,
  TGapsInCategories,
  TStageResult,
} from '../types/model.interface';

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

// Схема очков сегментов
const pointsResultSchema = new Schema(
  {
    stageNumber: { type: Number },
    place: { type: Number },
    points: { type: Number },
    multiplier: { type: Number, default: 1 },
    segment: { type: String },
  },
  { _id: false }
);

// Схемы очков спринта и горного зачёта
const pointsSprintSchema = new Schema(
  {
    ...pointsResultSchema.obj,
    sprint: { type: Number },
  },
  { _id: false }
);
const pointsMountainSchema = new Schema(
  {
    ...pointsResultSchema.obj,
    mountain: { type: Number },
  },
  { _id: false }
);

// Схема очков за этап
const pointsStageResultSchema = new Schema(
  {
    finishPoints: { type: Number },
    pointsSprint: [pointsSprintSchema],
    pointsMountain: [pointsMountainSchema],
    bonus: { type: Number },
  },
  { _id: false }
);

// Схема дисквалификации.
const disqualificationSchema = new Schema(
  {
    status: { type: Boolean, default: false }, // Дисквалифицирован ли райдер.
    reason: { type: String, trim: true }, // Причина дисквалификации.
  },
  { _id: false }
);

// Схема штрафа.
const penaltySchema = new Schema(
  {
    reason: { type: String, trim: true }, // Причина штрафа.
    timeInMilliseconds: { type: Number }, // Время штрафа.
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
      label: { type: Number, enum: [0, 1, 2, 3, 4, 5] },
      subgroupLabel: { type: String, enum: ['A', 'B', 'C', 'D', 'E'] },
    },
    sensorData: sensorDataSchema,
    category: {
      type: String,
      default: null,
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
