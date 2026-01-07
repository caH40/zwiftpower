import { Schema } from 'mongoose';

// types
import { TRaceRank } from '../../types/model.interface.js';

/**
 * Схема места райдера в разных категориях в заезде (этапе).
 */
export const raceRankSchema = new Schema<TRaceRank>(
  {
    category: { type: Number, default: 0 }, // Место в категории.
    absolute: { type: Number, default: 0 }, // Место в абсолюте.
  },
  { _id: false }
);
