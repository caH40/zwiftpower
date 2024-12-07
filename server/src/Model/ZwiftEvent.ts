import mongoose, { Schema, model } from 'mongoose';

import { ZwiftEventSchema } from '../types/model.interface.js';

const accessExpressionObjSchema = new Schema(
  {
    name: String,
    label: String,
    description: String,
  },
  { _id: false }
);

const zwiftEventSchema = new Schema<ZwiftEventSchema>({
  seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Series', default: null },
  typeRaceCustom: { type: String, default: null },
  accessExpressionObj: { type: accessExpressionObjSchema, default: null },
  id: { type: Number, unique: true, required: true },
  mapId: { type: Number, default: null },
  categoryEnforcement: { type: Boolean, default: false },
  accessExpression: { type: String, default: null },
  cullingType: { type: String, default: null },
  description: { type: String, default: null },
  eventStart: { type: String, default: null },
  eventType: { type: String, default: null },
  type: { type: String, default: null },
  imageUrl: { type: String, default: null },
  microserviceEventVisibility: { type: String, default: null },
  microserviceExternalResourceId: { type: String, default: null },
  name: { type: String, default: null },
  rulesSet: { type: [String], default: [] },
  organizer: { type: String, default: null },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer' },
  tags: { type: [String], default: [] },
  visible: { type: Boolean, default: true },
  totalEntrantCount: { type: Number, default: null },
  totalJoinedCount: { type: Number, default: null },
  totalSignedUpCount: { type: Number, default: null },
  eventSubgroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ZwiftEventSubgroup' }],
  clubName: { type: String },
  hasResults: { type: Boolean, default: false },
  needCount: { type: Boolean, default: true },
  updated: { type: Number, default: null },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  started: { type: Boolean, default: false },
  totalFinishedCount: { type: Number, default: 0 },
  modifiedResults: {
    hasModified: { type: Boolean, default: false },
    moderators: [
      {
        moderatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: Number,
        action: { property: String, value: String, rider: String, message: String },
      },
    ],
  },
});

export const ZwiftEvent = model<ZwiftEventSchema>('ZwiftEvent', zwiftEventSchema);
