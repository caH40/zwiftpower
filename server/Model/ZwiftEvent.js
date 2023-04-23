import mongoose from 'mongoose';
import pkg from 'mongoose';

const { Schema, model } = pkg;

const zwiftEventSchema = new Schema({
  seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Series' },
  typeEventCustom: { type: String, default: null },
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
  name: { type: String, default: null },
  rulesSet: { type: [String], default: [] },
  organizer: { type: String, default: null },
  tags: { type: [String], default: [] },
  visible: { type: Boolean, default: true },
  totalEntrantCount: { type: Number, default: null },
  totalJoinedCount: { type: Number, default: null },
  totalSignedUpCount: { type: Number, default: null },
  eventSubgroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ZwiftEventSubgroup' }],
  hasResults: { type: Boolean, default: false },
  needCount: { type: Boolean, default: true },
});

export const ZwiftEvent = model('ZwiftEvent', zwiftEventSchema);
