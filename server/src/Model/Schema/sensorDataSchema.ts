import { Schema } from 'mongoose';

/**
 * Схема данных по датчикам (сенсорам) райдера в заезде Звифта.
 */
export const sensorDataSchema = new Schema(
  {
    avgWatts: Number,
    heartRateData: { avgHeartRate: Number, heartRateMonitor: Boolean },
    pairedSteeringDevice: Boolean,
    powerType: String,
    trainerDifficulty: Number,
  },
  { _id: false }
);
