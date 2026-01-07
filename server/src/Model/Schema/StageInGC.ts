import { Schema } from 'mongoose';

import { profileDataSchema } from './ProfileDataSchema.js';
import { raceRankSchema } from './RaceRank.js';

// types
import { TGCRiderStage } from '../../types/series.types.js';

/**
 * Схема этапа в генеральной классификации серии заездов.
 */
export const stageSchema = new Schema<TGCRiderStage>(
  {
    category: { type: String, default: null }, // Категория.
    stageOrder: { type: Number, required: true }, // Порядковый номер этапа.
    durationInMilliseconds: { type: Number, default: 0 }, // Время этапа.
    distanceInMeters: { type: Number, default: 0 }, // Пройденное расстояние.
    elevationInMeters: { type: Number, default: 0 }, // Набор высоты за этап.
    calories: { type: Number, default: 0 }, // Калории за этап.
    // includeInTotal: { type: Boolean, default: true }, // Влияет ли этап на суммарные очки.
    finishPoints: { type: Number, default: 0 }, // Очки за этап (если есть).
    profileData: { type: profileDataSchema, default: null },
    raceRank: { type: raceRankSchema, default: null }, // Место на этапе в категориях.
  },
  { _id: false }
);
