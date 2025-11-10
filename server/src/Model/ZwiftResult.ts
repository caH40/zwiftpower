import mongoose, { Schema, model } from 'mongoose';

import { ZwiftResultSchema } from '../types/model.interface.js';
import { TeamForProfileSchema } from './Schema/TeamForProfileSchema.js';

const zwiftResultSchema = new Schema<ZwiftResultSchema>({
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
    team: { type: TeamForProfileSchema },
  },

  eventSubgroupId: { type: Number, default: null },
  subgroupLabel: { type: String, default: null },
  rank: { type: Number, default: 0 },
  rankEvent: { type: Number, default: null },
  eventId: { type: Number, default: null },

  activityData: {
    activityId: { type: String, default: null },
    sport: { type: String, default: null },
    durationInMilliseconds: { type: Number, default: null },
    segmentDistanceInCentimeters: { type: Number, default: null },
    segmentDistanceInMeters: { type: Number, default: null },
    elevationInMeters: { type: Number },
    calories: { type: Number },
    endDate: { type: String },
  },

  scoreHistory: {
    newScore: { type: Number },
    previousScore: { type: Number },
    scoreChangeType: { type: String },
  },

  sensorData: {
    heartRateData: {
      avgHeartRate: { type: Number, default: null },
      heartRateMonitor: { type: Boolean },
    },
    avgWatts: { type: Number, default: null },
    pairedSteeringDevice: { type: Boolean, default: false },
    powerType: { type: String, default: null },
    trainerDifficulty: { type: Number },
  },
  wattsPerKg: { type: Number, default: null },
  speed: { type: Number },
  normalizedPower: { type: Number },
  variabilityIndex: { type: Number },

  flaggedCheating: { type: Boolean, default: false },
  flaggedSandbagging: { type: Boolean, default: false },
  // свойства из предыдущей модели
  penalty: { fairPlay: { type: Number, default: 0 } },
  isDisqualification: { type: Boolean, default: false },
  disqualification: { type: String, default: null },
  disqualificationDescription: { type: String, default: null },
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

  profileDataMain: {
    profileIdMain: Number,
    firstName: String,
    lastName: String,
    gender: String,
    weightInGrams: Number,
    heightInCentimeters: Number,
    imageSrc: String,
    countryAlpha3: String,
    age: Number,
    team: { type: TeamForProfileSchema },
  },
});

export const ZwiftResult = model<ZwiftResultSchema>('ZwiftResult', zwiftResultSchema);
