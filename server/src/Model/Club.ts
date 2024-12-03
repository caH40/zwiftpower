import mongoose, { Document, Schema, model } from 'mongoose';

import { TClubZwift } from '../types/model.interface.js';

/**
 * Схема и модель для клуба из Звифт
 */
const clubSchema = new Schema<TClubZwift>(
  {
    id: { type: String, unique: true, required: true },
    images: {
      icon: String,
      event: String,
      club_large: String,
    },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer' },
    name: String,
    tagline: String,
    description: String,
    moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export const Club = model<TClubZwift & Document>('Club', clubSchema);
