import mongoose from 'mongoose';
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
});

export const ZwiftEventSubgroup = model('ZwiftEventSubgroup', zwiftEventSubgroupSchema);