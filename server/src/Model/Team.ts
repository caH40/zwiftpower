import mongoose, { Document, Schema, model } from 'mongoose';

import { SocialLinksSchema } from './Schema/SocialLinksSchema.js';
import { TelegramSchema } from './Schema/TelegramSchema.js';
import { FileMetadataSchema } from './Schema/FileMetadataSchema.js';

// types
import { TTeam } from '../types/model.interface.js';

export type TTeamDocument = TTeam & Document;

const teamSchema = new Schema<TTeamDocument>(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name: { type: String, required: true, unique: true },
    shortName: { type: String, required: true, unique: true },
    urlSlug: { type: String, required: true, unique: true },
    logoFileInfo: { type: FileMetadataSchema },
    posterFileInfo: { type: FileMetadataSchema },
    mission: { type: String },
    description: { type: String },
    telegram: { type: TelegramSchema },
    website: { type: String },
    contact: {
      email: { type: String },
      phone: { type: String },
    },
    country: { type: String },
    socialLinks: { type: SocialLinksSchema },
    pendingRiders: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        requestedAt: { type: Date, required: true, default: () => new Date() },
      },
    ],
    bannedRiders: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        reason: { type: String },
        bannedAt: { type: Date, required: true, default: () => new Date() },
      },
    ],
  },
  { timestamps: true }
);

export const TeamModel = model<TTeamDocument>('Team', teamSchema);
