import { Schema } from 'mongoose';

// types
import { TRacePointsRule } from '../../types/points.types';

export const RacePointsRuleSchema = new Schema<TRacePointsRule>(
  {
    place: { type: Number, required: true }, // Место в финишном протоколе
    points: { type: Number, required: true }, // Очки за это место
  },
  { _id: false }
);
