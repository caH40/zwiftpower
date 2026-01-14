import { Schema } from 'mongoose';

export const FinishTimeClassificationSchema = new Schema(
  {
    timeInMilliseconds: { type: Number },
    gapToLeaderInMilliseconds: { type: Number },
  },
  { _id: false }
);
