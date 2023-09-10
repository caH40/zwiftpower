import mongoose, { Schema, model } from 'mongoose';

import { RiderSchema } from '../types/model.interface.js';

const riderSchema = new Schema<RiderSchema>({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  firstName: String,
  lastName: String,
  firstNameZwift: String,
  lastNameZwift: String,
  telegramUsername: String,
  telegramId: { type: Number, unique: true },
  zwiftId: { type: Number, unique: true },
  cycleTrainer: String,
  zwiftPower: String,
  yearBirth: String,
  category: String,
  categoryTour: String,
  gender: String,
  settings: {
    notice: {
      news: { type: Boolean, default: true },
      newRace: { type: Boolean, default: true },
      botInfo: { type: Boolean, default: true },
      training: { type: Boolean, default: true },
    },
  },
  password: String,
});

export const Rider = model<RiderSchema>('Rider', riderSchema);
