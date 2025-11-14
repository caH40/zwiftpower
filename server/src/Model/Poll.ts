import mongoose, { Document, model, Schema } from 'mongoose';

import { PollOptionSchema } from './Schema/PollOptions.js';

// types
import { TPoll } from '../types/model.interface.js';

type PollDocument = TPoll & Document;

const PollSchema = new Schema<PollDocument>(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll', required: true }, //ID создателя голосования.
    title: { type: String, trim: true, required: true }, // Заголовок опроса.
    options: { type: [PollOptionSchema], default: [], required: true }, // Варианты ответа.
    isAnonymous: { type: Boolean, default: false }, // Анонимное голосование.
    multipleAnswersAllowed: { type: Boolean, default: false }, // Возможность выбрать несколько вариантов.
    startDate: { type: Date, required: true }, // Дата начала опроса.
    endDate: { type: Date, required: true }, // Дата окончания опроса.
  },
  { timestamps: true }
);

export const PollModel = model<PollDocument>('Poll', PollSchema);
