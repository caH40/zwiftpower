import mongoose, { Schema, model } from 'mongoose';
import { ClubSchema } from '../types/model.interface.js';

const clubSchema = new Schema<ClubSchema>({
  id: { type: String, unique: true, required: true },
  images: {
    icon: String,
    event: String,
    club_large: String,
  },
  name: String,
  tagline: String,
  description: String,
  moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export const Club = model('Club', clubSchema);
