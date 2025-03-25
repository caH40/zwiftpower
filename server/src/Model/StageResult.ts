import mongoose, { Document, Schema, Types, model } from 'mongoose';
import { TStageResult } from '../types/model.interface';

// Интерфейс для результата этапа
export interface IStageResult extends Omit<TStageResult, '_id'>, Document {
  _id: Types.ObjectId;
}

// Схема профиля райдера
const profileDataSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    weightInGrams: { type: Number, required: true },
    heightInCentimeters: { type: Number, required: true },
    imageSrc: { type: String, default: null },
    countryAlpha3: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { _id: false }
);

// Схема CP Best Efforts
const cpBestEffortsSchema = new Schema(
  {
    duration: { type: Number, required: true },
    power: { type: Number, required: true },
  },
  { _id: false }
);

// Схема очков сегментов
const pointsResultSchema = new Schema(
  {
    stageNumber: { type: Number, required: true },
    place: { type: Number, required: true },
    points: { type: Number, required: true },
    multiplier: { type: Number, default: 1 },
    segment: { type: String },
  },
  { _id: false }
);

// Схемы очков спринта и горного зачёта
const pointsSprintSchema = new Schema(
  {
    ...pointsResultSchema.obj,
    sprint: { type: Number, required: true },
  },
  { _id: false }
);
const pointsMountainSchema = new Schema(
  {
    ...pointsResultSchema.obj,
    mountain: { type: Number, required: true },
  },
  { _id: false }
);

// Схема очков за этап
const pointsStageResultSchema = new Schema(
  {
    finishPoints: { type: Number, required: true },
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

// Основная схема результата этапа
const stageResultSchema = new Schema<IStageResult>(
  {
    series: { type: mongoose.Schema.Types.ObjectId, ref: 'NSeries', required: true },
    order: { type: Number, required: true },
    profileId: { type: Number, required: true },
    profileData: { type: profileDataSchema, required: true },
    cpBestEfforts: [cpBestEffortsSchema],
    activityData: {
      durationInMilliseconds: { type: Number, required: true },
      label: { type: Number, enum: [0, 1, 2, 3, 4, 5], required: true },
      subgroupLabel: { type: String, enum: ['A', 'B', 'C', 'D', 'E'], required: true },
    },
    category: {
      type: String,
      default: null,
    },
    points: { type: pointsStageResultSchema, default: null },
    disqualification: { type: disqualificationSchema, default: null },
    penalty: { type: [penaltySchema], default: null },
    teamSquadAtRace: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamSquad', default: null },
  },
  { timestamps: true }
);

export const StageResultModel = model<IStageResult>('StageResult', stageResultSchema);
