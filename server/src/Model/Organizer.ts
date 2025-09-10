import mongoose, { Document, Schema, model } from 'mongoose';

import { FileMetadataSchema } from './Schema/FileMetadataSchema.js';
import { SocialLinksSchema } from './Schema/SocialLinksSchema.js';
import { TelegramSchema } from './Schema/TelegramSchema.js';
import { BotZwiftSchema } from './Schema/BotZwiftSchema.js';

// types
import { TOrganizer } from '../types/model.interface.js';

/**
 *  Схема Организатора заезда, у организатора может быть несколько клубов
 */
const organizerSchema = new Schema<TOrganizer & Document>(
  {
    isPublished: { type: Boolean, default: false },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    botZwift: { type: BotZwiftSchema },
    name: { type: String, unique: true, required: true, trim: true },
    shortName: { type: String, trim: true },
    urlSlug: { type: String, trim: true },
    logoFileInfo: { type: FileMetadataSchema },
    posterFileInfo: { type: FileMetadataSchema },
    mission: { type: String, trim: true },
    description: { type: String, trim: true },
    clubMain: { type: String },
    telegram: { type: TelegramSchema },
    website: { type: String },
    country: { type: String },
    socialLinks: { type: SocialLinksSchema },
  },
  { timestamps: true }
);

export const Organizer = model<TOrganizer & Document>('Organizer', organizerSchema);
