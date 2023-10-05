import { Schema, model } from 'mongoose';

// type
import { ZwiftProfileSchema } from '../types/model.interface.js';

/**
 * Данные из Звифта, создаются при первом результате райдера в Эвенте БД,
 * обновляется с каждым новым результатом
 */
const zwiftProfileSchema = new Schema<ZwiftProfileSchema>({
  id: { type: Number, unique: true },
  publicId: String,
  firstName: String,
  lastName: String,
  male: Boolean,
  eventCategory: String,
  imageSrc: String,
  imageSrcLarge: String,
  playerType: String,
  countryAlpha3: String,
  countryCode: Number,
  age: Number,
  height: Number,
  weight: Number,
  ftp: Number,
});

export const ZwiftProfile = model<ZwiftProfileSchema>('ZwiftProfile', zwiftProfileSchema);
