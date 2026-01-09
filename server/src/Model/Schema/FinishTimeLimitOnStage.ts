import { Schema } from 'mongoose';

// types
import { TFinishTimeLimitOnStage } from '../../types/series.types';

export const FinishTimeLimitOnStageSchema = new Schema<TFinishTimeLimitOnStage>(
  {
    percentageFromLeader: { type: Number, default: 0 },
    enforcement: { type: String, enum: ['auto', 'manual'], default: 'manual' },
  },
  { _id: false }
);
