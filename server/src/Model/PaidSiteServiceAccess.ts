import mongoose, { model, Schema } from 'mongoose';

import { ENTITY_NAME_SLOTS, SLOT_ORIGIN } from '../assets/constants.js';

// types
import { TPaidSiteServiceAccessDocument } from '../types/model.interface.js';
import {
  TSiteService,
  TSubscriptionPeriodSlot,
  TSubscriptionPieceSlot,
} from '../types/site-service.type.js';

const SubscriptionPeriodSlotSchema = new Schema<TSubscriptionPeriodSlot>(
  {
    description: { type: String, required: true },
    isPaused: { type: Boolean, default: false },
    origin: {
      type: String,
      enum: SLOT_ORIGIN,
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { _id: false }
);

const SubscriptionPieceSlotSchema = new Schema<TSubscriptionPieceSlot>(
  {
    description: { type: String, required: true },
    origin: {
      type: String,
      enum: SLOT_ORIGIN,
      required: true,
    },
    quantity: { type: Number },
  },
  { _id: false }
);

const SiteServiceSchema = new Schema<TSiteService>(
  {
    entityName: { type: String, enum: ENTITY_NAME_SLOTS, required: true },
    periodSlots: { type: [SubscriptionPeriodSlotSchema], default: [] },
    pieceSlots: { type: [SubscriptionPieceSlotSchema], default: [] },
  },
  { _id: false }
);

/**
 * Схема платных подписок на сервисы сайта у пользователя.
 */
const PaidSiteServiceAccessSchema = new Schema<TPaidSiteServiceAccessDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  services: { type: [SiteServiceSchema], default: [] },
});

export const PaidSiteServiceAccessModel = model<TPaidSiteServiceAccessDocument>(
  'PaidSiteServiceAccess',
  PaidSiteServiceAccessSchema
);
