import { Schema } from 'mongoose';
import { TPointsStageResult } from '../../types/model.interface';

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

/**
 * Схема очков за этап.
 */
export const pointsStageResultSchema = new Schema<TPointsStageResult>(
  {
    finishPoints: { type: Number },
    pointsSprint: [pointsSprintSchema],
    pointsMountain: [pointsMountainSchema],
    teamZpPoints: { type: Number },
    bonus: { type: Number },
  },
  { _id: false }
);
