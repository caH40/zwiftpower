import mongoose, { Document, Schema, model } from 'mongoose';

import { TEAM_ROLES, TEAM_SPECIALIZATIONS } from '../assets/constants.js';

// types
import { TTeamMember } from '../types/model.interface.js';

export type TTeamMemberDocument = TTeamMember & Document;

const teamMemberSchema = new Schema<TTeamMemberDocument>(
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

export const TeamMemberModel = model<TTeamMemberDocument>('TeamMember', teamMemberSchema);
