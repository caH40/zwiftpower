import mongoose, { model, Schema } from 'mongoose';

// types
import { TPaidSiteServiceAccessDocument } from '../types/model.interface';
import { TSiteService, TSubscriptionSlot } from '../types/site-service.type';

const SubscriptionSlotSchema = new Schema<TSubscriptionSlot>(
  {
    description: { type: String, required: true },
    isPaused: { type: Boolean, default: false },
    origin: {
      type: String,
      enum: ['trial', 'purchased', 'gift', 'promo', 'admin'],
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { _id: false }
);

const SiteServiceSchema = new Schema<TSiteService>(
  {
    entityName: { type: String, enum: ['organizer'], required: true },
    slots: { type: [SubscriptionSlotSchema] },
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
