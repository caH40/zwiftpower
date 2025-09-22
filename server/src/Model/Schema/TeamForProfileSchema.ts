import { Document, Schema } from 'mongoose';

// types
import { TTeamForProfile } from '../../types/types.interface';

type TTeamForProfileDocument = TTeamForProfile & Document;

export const TeamForProfileSchema = new Schema<TTeamForProfileDocument>(
  {
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    urlSlug: { type: String, required: true },
  },
  { _id: false }
);
