import { Schema, model } from 'mongoose';

import { RiderProfileSchema } from '../types/model.interface.js';

/**
 * Все райдеры участвующие в заездах на сайте zwiftpower.ru
 */
const riderSchema = new Schema<RiderProfileSchema>({
  zwiftId: { type: Number, unique: true, required: true },
  firstName: String,
  lastName: String,
  male: Boolean,
  eventCategory: String,
  imageSrc: String,
  countryAlpha3: String,
  age: Number,
  height: Number,
  weight: Number,
  competitionMetrics: {
    racingScore: Number,
    category: String,
    categoryWomen: String,
  },
  totalEvents: Number,
  medals: {
    gold: Number,
    silver: Number,
    bronze: Number,
  },
});

export const Rider = model<RiderProfileSchema>('Rider', riderSchema);
