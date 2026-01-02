import mongoose, { Schema } from 'mongoose';

// types
import { TStageTimePenalty } from '../../types/model.interface';

/**
 *  Схема штрафа в виде добавления времени к результату этапа.
 */
export const timePenaltySchema = new Schema<TStageTimePenalty>(
  {
    reason: { type: String, trim: true, required: true }, // Причина штрафа.
    timeInMilliseconds: { type: Number, required: true }, // Время штрафа.
    moderator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifiedAt: { type: Date, required: true },
  },
  { _id: false }
);
