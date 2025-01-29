import mongoose, { Document, Schema, model } from 'mongoose';
import {
  TFileMetadataForCloud,
  TOrganizer,
  TOrganizerBotZwift,
  TSocialLinks,
  TTelegram,
} from '../types/model.interface.js';

/**
 *  Схема Организатора заезда, у организатора может быть несколько клубов
 */
const BotZwiftSchema = new Schema<TOrganizerBotZwift>(
  {
    token: { type: String },
    email: { type: String },
    password: { type: String },
  },
  { _id: false }
);
const TelegramSchema = new Schema<TTelegram>(
  {
    group: { type: String },
    channel: { type: String },
  },
  { _id: false }
);
const SocialLinksSchema = new Schema<TSocialLinks>(
  {
    vk: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    youtube: { type: String },
  },
  { _id: false }
);
const FileMetadataSchema = new Schema<TFileMetadataForCloud>(
  {
    baseName: {
      type: String,
      trim: true,
    },
    originalExtension: {
      type: String,
      trim: true,
    },
    optimizedExtension: {
      type: String,
      trim: true,
    },
    availableSizes: {
      type: [String],
      enum: ['original', 'large', 'medium', 'small', 'xLarge'],
      default: ['original'],
    },
  },
  { _id: false }
);

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
