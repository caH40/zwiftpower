import { Schema, model } from 'mongoose';

import { SeriesSchema } from '../types/model.interface.js';

const seriesSchema = new Schema<SeriesSchema>({
  name: { type: String, unique: true, required: true },
  dateStart: Number,
  description: String,
  descriptionShort: String,
  type: String,
  organizer: String,
  hasGeneral: Boolean,
  hasTeams: Boolean,
  isFinished: { type: Boolean, default: false },
});

export const Series = model<SeriesSchema>('Series', seriesSchema);
