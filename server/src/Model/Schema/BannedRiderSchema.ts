import mongoose, { Schema } from 'mongoose';

import { TTeam } from '../../types/model.interface';

type TBannedRider = NonNullable<TTeam['bannedRiders']>[number];

export const BannedRiderSchema = new Schema<TBannedRider>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String },
    bannedAt: { type: Date, required: true, default: () => new Date() },
  },
  { _id: false }
);
