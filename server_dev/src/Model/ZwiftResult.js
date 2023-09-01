import mongoose from 'mongoose';
import pkg from 'mongoose';

const { Schema, model } = pkg;

const zwiftResultSchema = new Schema({
  zwiftEventId: { type: mongoose.Schema.Types.ObjectId, ref: 'ZwiftEvent' },
  subgroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'ZwiftEventSubgroup' }, // зачем?
  profileId: { type: Number, default: null },

  profileData: {
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    gender: { type: String, default: null },
    weightInGrams: { type: Number, default: null },
    heightInCentimeters: { type: Number, default: null },
    imageSrc: { type: String, default: null },
    countryAlpha3: { type: String, default: null },
    age: { type: Number, default: null },
  },

  eventSubgroupId: { type: Number, default: null },
  subgroupLabel: { type: String, default: null },
  rank: { type: Number, default: null },
  rankEvent: { type: Number, default: null },
  eventId: { type: Number, default: null },

  activityData: {
    activityId: { type: String, default: null },
    sport: { type: String, default: null },
    durationInMilliseconds: { type: Number, default: null },
  },

  sensorData: {
    heartRateData: { avgHeartRate: { type: Number, default: null } },
    avgWatts: { type: Number, default: null },
    powerType: { type: String, default: null },
  },
  wattsPerKg: { type: Number, default: null },

  flaggedCheating: { type: Boolean, default: false },
  flaggedSandbagging: { type: Boolean, default: false },
  // свойства из предыдущей модели
  rankAbsolute: { type: Number, default: null },
  penalty: { fairPlay: { type: Number, default: 0 } },
  isDisqualification: { type: Boolean, default: false },
  isDidNotFinish: { type: Boolean, default: false },
  category: { type: String, default: null },
  categoryCurrent: { type: String, default: null },
  teamCurrent: { type: String, default: null },
  pointsStage: { type: Number, default: 0 },
  isUnderChecking: { type: Boolean, default: false },
  addedManually: { type: Boolean, default: false },
  cpBestEfforts: [
    {
      watts: { type: Number, default: null },
      wattsKg: { type: Number, default: null },
      cpLabel: { type: String, default: null },
      duration: { type: Number, default: null },
    },
  ],
});

export const ZwiftResult = model('ZwiftResult', zwiftResultSchema);
