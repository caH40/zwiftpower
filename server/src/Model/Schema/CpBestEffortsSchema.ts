import { Schema } from 'mongoose';

// types
import { TCriticalPowerBestEfforts } from '../../types/model.interface';

/**
 * Схема CP Best Efforts
 */
export const cpBestEffortsSchema = new Schema<TCriticalPowerBestEfforts>(
  {
    watts: { type: Number },
    wattsKg: { type: Number },
    cpLabel: { type: String },
    duration: { type: Number },
  },
  { _id: false }
);
