import mongoose, { Schema, model } from 'mongoose';
import { OrganizerSchema, TOrganizerBotZwift } from '../types/model.interface.js';

/**
 *  Схема Организатора заезда, у организатора может быть несколько клубов
 */
const BotZwiftSchema = new Schema<TOrganizerBotZwift>({
  token: { type: String },
  email: { type: String },
  password: { type: String },
});

const organizerSchema = new Schema<OrganizerSchema>(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    botZwift: { type: BotZwiftSchema },
    name: { type: String, unique: true, required: true },
    label: { type: String },
    backgroundImage: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export const Organizer = model('Organizer', organizerSchema);
