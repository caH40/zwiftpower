import mongoose, { Document, Schema, model } from 'mongoose';

import { TEAM_ROLES, TEAM_SPECIALIZATIONS } from '../assets/constants.js';

// types
import { TTeamRider } from '../types/model.interface.js';

export type TTeamRiderDocument = TTeamRider & Document;

const teamRiderSchema = new Schema<TTeamRiderDocument>(
  {
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    role: { type: String, enum: TEAM_ROLES },
    specialization: { type: String, enum: TEAM_SPECIALIZATIONS },
  },
  { timestamps: true }
);

export const TeamRiderModel = model<TTeamRiderDocument>('TeamRider', teamRiderSchema);
