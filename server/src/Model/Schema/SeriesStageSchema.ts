import mongoose, { Schema } from 'mongoose';

// types
import { TSeriesStage } from '../../types/model.interface';

/**
 * Схема этапа серии (Stage) для Mongoose.
 *
 * Описывает структуру отдельного этапа в серии заездов.
 * Используется внутри схемы TSeries (например, массив stages).
 */
export const seriesStageSchema = new Schema<TSeriesStage>(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'ZwiftEvent', required: true },
    order: { type: Number, default: 0 },
    label: { type: String },
    hasResults: { type: Boolean, default: false },
    resultsUpdatedAt: { type: Date },
    includeResults: { type: Boolean, default: true },
    disableTimeGapRule: { type: Boolean, default: false },
    requiredForGeneral: { type: Boolean, default: true },
  },
  { _id: false }
);
