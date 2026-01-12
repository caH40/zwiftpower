import { Schema } from 'mongoose';

export const FinishTimeClassificationSchema = new Schema(
  {
    applied: { type: Boolean },
    timeInMilliseconds: { type: Number },
    gapToLeaderInMilliseconds: { type: Number },
  },
  { _id: false }
);
