import mongoose, { Schema } from 'mongoose';

// types
import { TStagePenalty } from '../../types/model.interface';

/**
 *  Схема штрафа в виде добавления времени к результату этапа.
 */
export const penaltySchema = new Schema<TStagePenalty>(
  {
    reason: { type: String, trim: true }, // Причина штрафа.
    timeInMilliseconds: { type: Number }, // Время штрафа.
    moderator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifiedAt: { type: Date },
  },
  { _id: false }
);
