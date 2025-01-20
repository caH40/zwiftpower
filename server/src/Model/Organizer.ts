import mongoose, { Document, Schema, model } from 'mongoose';
import { TOrganizer, TOrganizerBotZwift } from '../types/model.interface.js';

/**
 *  Схема Организатора заезда, у организатора может быть несколько клубов
 */
const BotZwiftSchema = new Schema<TOrganizerBotZwift>({
  token: { type: String },
  email: { type: String },
  password: { type: String },
});

const organizerSchema = new Schema<TOrganizer>(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    botZwift: { type: BotZwiftSchema },
    name: { type: String, unique: true, required: true },
    shortName: { type: String },
    label: { type: String },
    urlSlug: { type: String },
    logoSrc: { type: String },
    backgroundImage: { type: String },
    description: { type: String },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Organizer = model<TOrganizer & Document>('Organizer', organizerSchema);
