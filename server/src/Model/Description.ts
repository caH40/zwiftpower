import { Schema, model } from 'mongoose';

import { DescriptionSchema } from '../types/model.interface.js';

const descriptionSchema = new Schema<DescriptionSchema>({
  name: { type: String, unique: true, required: true },
  description: { type: String },
});

export const Description = model<DescriptionSchema>('Description', descriptionSchema);
