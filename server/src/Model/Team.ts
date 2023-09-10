import mongoose, { Schema, model } from 'mongoose';

import { TeamSchema } from '../types/model.interface.js';

const teamSchema = new Schema<TeamSchema>({
  name: { type: String, unique: true },
  riders: [
    {
      rider: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider', required: true },
      dateJoin: { type: Number, required: true },
      dateLeave: Number,
      _id: false,
    },
  ],
  description: String,
  logoUrl: String,
  logoBase64: String,
  groupName: String,
  link: String,
  isAllowed: { type: Boolean, default: false },
  requestRiders: [],
  deleted: { isDeleted: { type: Boolean, default: false }, date: { type: Number } },
});

export const Team = model<TeamSchema>('Team', teamSchema);
