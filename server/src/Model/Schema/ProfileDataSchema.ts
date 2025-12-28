import { Schema } from 'mongoose';

//types
import { TeamForProfileSchema } from './TeamForProfileSchema.js';

/**
 * Схема профиля райдера.
 */
export const profileDataSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String },
    weightInGrams: { type: Number },
    heightInCentimeters: { type: Number },
    imageSrc: { type: String, default: null },
    countryAlpha3: { type: String },
    age: { type: Number },
    team: { type: TeamForProfileSchema },
  },
  { _id: false }
);

/**
 * Схема профиля райдера (главного профиля, если привязано несколько zwiftId)
 */
export const profileDataMainSchema = new Schema(
  {
    profileIdMain: { type: Number, required: true },
  },
  { _id: false }
);

// добавляем все поля из базовой схемы
profileDataMainSchema.add(profileDataSchema);
