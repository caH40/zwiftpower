import pkg from 'mongoose';

const { Schema, model } = pkg;

const zwiftEventSubgroupSchema = new Schema({
  bikeHash: { type: Number, default: null },
  description: { type: String, default: null },
  eventSubgroupStart: { type: String, default: null },
  id: { type: Number, unique: true, required: true },
  jerseyHash: { type: Number, default: null },
  label: { type: Number, default: null },
  laps: { type: Number, default: null },
  distanceInMeters: { type: Number, default: null },
  durationInSeconds: { type: Number, default: null },
  distanceSummary: {
    distanceInKilometers: { type: Number, default: null },
    elevationGainInMeters: { type: Number, default: null },
  },
  zwiftInsiderUrl: { type: String, default: null },
  mapId: { type: Number, default: null },
  name: { type: String, default: null },
  routeId: { type: Number, default: null },
  rulesSet: { type: [String], default: [] },
  subgroupLabel: { type: String, default: null },
  tags: { type: [String], default: [] },
  timeTrialOptions: { type: Object, default: null },
  totalEntrantCount: { type: Number, default: null },
  totalJoinedCount: { type: Number, default: null },
  totalSignedUpCount: { type: Number, default: null },
  invitedLeaders: { type: [Number], default: [] },
  invitedSweepers: { type: [Number], default: [] },
});

export const ZwiftEventSubgroup = model('ZwiftEventSubgroup', zwiftEventSubgroupSchema);
