import { Schema, model } from 'mongoose';

import { RiderSchema } from '../types/model.interface.js';

const rightsSchema = new Schema<RiderSchema>({
  unique: { type: String, unique: true, default: '0' },
  root: [Number],
  admin: [Number],
  moderator: [Number],
});

export const Rights = model<RiderSchema>('Rights', rightsSchema);
