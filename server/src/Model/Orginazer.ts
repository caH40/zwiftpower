import mongoose, { Schema, model } from 'mongoose';
import { OrganizerSchema } from '../types/model.interface.js';

/**
 *  Схема Организатора заезда, у организатора может быть несколько клубов
 */
const organizerSchema = new Schema<OrganizerSchema>(
  {
    name: { type: String, unique: true, required: true },
    images: {
      icon: String,
      poster: String,
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: String,
  },
  { timestamps: true }
);

export const Organizer = model('Organizer', organizerSchema);
