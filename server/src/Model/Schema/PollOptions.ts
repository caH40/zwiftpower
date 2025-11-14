import { Schema } from 'mongoose';

// types
import { TPollOption } from '../../types/poll.types.js';

export const PollOptionSchema = new Schema<TPollOption>(
  {
    optionId: { type: Number, required: true }, // Локальный ID варианта внутри опроса.
    title: { type: String, required: true, trim: true }, // Текст варианта ответа.
  },
  { _id: false }
);
