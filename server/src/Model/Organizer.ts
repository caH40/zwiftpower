import mongoose, { Document, Schema, model } from 'mongoose';
import {
  TOrganizer,
  TOrganizerBotZwift,
  TSocialLinks,
  TTelegram,
} from '../types/model.interface.js';

/**
 *  Схема Организатора заезда, у организатора может быть несколько клубов
 */
const BotZwiftSchema = new Schema<TOrganizerBotZwift>({
  token: { type: String },
  email: { type: String },
  password: { type: String },
});
const TelegramSchema = new Schema<TTelegram>({
  group: { type: String },
  channel: { type: String },
});
const SocialLinksSchema = new Schema<TSocialLinks>({
  vk: { type: String },
  facebook: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  youtube: { type: String },
});

const organizerSchema = new Schema<TOrganizer & Document>(
  {
    isPublished: { type: Boolean, default: false },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    botZwift: { type: BotZwiftSchema },
    name: { type: String, unique: true, required: true },
    shortName: { type: String },
    label: { type: String },
    urlSlug: { type: String },
    logoSrc: { type: String },
    backgroundImage: { type: String },
    description: { type: String },
    clubMain: { type: String },
    telegram: { type: TelegramSchema },
    website: { type: String },
    country: { type: String },
    socialLinks: { type: SocialLinksSchema },
  },
  { timestamps: true }
);

export const Organizer = model<TOrganizer & Document>('Organizer', organizerSchema);
