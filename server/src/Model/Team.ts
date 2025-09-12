import mongoose, { Document, Schema, model } from 'mongoose';

import { SocialLinksSchema } from './Schema/SocialLinksSchema.js';
import { TelegramSchema } from './Schema/TelegramSchema.js';
import { FileMetadataSchema } from './Schema/FileMetadataSchema.js';
import { PendingRiderSchema } from './Schema/PendingRiderSchema.js';
import { BannedRiderSchema } from './Schema/BannedRiderSchema.js';

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
    name: { type: String, required: true, unique: true, trim: true },
    shortName: { type: String, required: true, unique: true, trim: true },
    urlSlug: { type: String, required: true, unique: true, trim: true },
    logoFileInfo: { type: FileMetadataSchema },
    posterFileInfo: { type: FileMetadataSchema },
    mission: { type: String, trim: true },
    description: { type: String, trim: true },
    telegram: { type: TelegramSchema },
    website: { type: String, trim: true },
    contact: {
      email: { type: String },
      phone: { type: String },
    },
    country: { type: String },
    socialLinks: { type: SocialLinksSchema },
    pendingRiders: { type: [PendingRiderSchema], default: [] },
    bannedRiders: { type: [BannedRiderSchema], default: [] },
  },
  { timestamps: true }
);

// Уникальный индекс для name без учёта регистра.
teamSchema.index({ name: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

export const TeamModel = model<TTeamDocument>('Team', teamSchema);
