import mongoose, { Schema, model, Document } from 'mongoose';

// types
import { TPollAnswer } from '../types/model.interface.js';

type PollAnswerDocument = TPollAnswer & Document;

export const PollAnswerSchema = new Schema<PollAnswerDocument>(
  {
    poll: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll', required: true }, // ID опроса.
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID пользователя.
    selectedOptionIds: { type: [Number], required: true, default: [] }, // Список выбранных вариантов (optionId).
  },
  { timestamps: true }
);

// 🔐 Гарантированно один ответ на одного пользователя в одном опросе
PollAnswerSchema.index({ poll: 1, user: 1 }, { unique: true });

export const PollAnswerModel = model<PollAnswerDocument>('PollAnswer', PollAnswerSchema);
