import mongoose, { Schema } from 'mongoose';

import { TTeam } from '../../types/model.interface';

type TPendingRider = NonNullable<TTeam['pendingRiders']>[number];

export const PendingRiderSchema = new Schema<TPendingRider>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    requestedAt: { type: Date, required: true, default: () => new Date() },
  },
  { _id: false }
);
