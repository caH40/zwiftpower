import mongoose, { Schema, Document, model } from 'mongoose';

// types
import { TTeamSeasonRating } from '../types/model.interface';

type TeamSeasonRatingDocument = Omit<TTeamSeasonRating, '_id'> & Document;

const TeamSeasonRatingSchema = new Schema<TeamSeasonRatingDocument>(
  {
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    season: { type: String, required: true },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    eventsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ZwiftEvent' }],
  },
  { timestamps: true }
);

// уникальность команды в сезоне.
TeamSeasonRatingSchema.index({ team: 1, season: 1 }, { unique: true });

TeamSeasonRatingSchema.index({ season: 1, rank: 1 });

export const TeamSeasonRatingModel = model<TeamSeasonRatingDocument>(
  'TeamSeasonRating',
  TeamSeasonRatingSchema
);
