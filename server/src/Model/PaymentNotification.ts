import mongoose, { model, Schema } from 'mongoose';

import { ENTITY_NAME_SLOTS, PURCHASE_UNITS } from '../assets/constants.js';

// types
import { TPaymentNotificationDocument, TPurchaseMetadata } from '../types/payment.types.js';

const MetadataSchema = new Schema<TPurchaseMetadata>(
  {
    entityName: { type: String, enum: ENTITY_NAME_SLOTS, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, enum: PURCHASE_UNITS, required: true },
  },
  { _id: false }
);

const PaymentNotificationSchema = new Schema<TPaymentNotificationDocument>({
  event: {
    type: String,
    enum: [
      'payment.succeeded',
      'payment.pending',
      'payment.waiting_for_capture',
      'payment.canceled',
    ],
    required: true,
  },
  id: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['succeeded', 'pending', 'waiting_for_capture', 'canceled'],
    required: true,
  },
  description: { type: String },
  amount: {
    value: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  income_amount: {
    value: { type: Number },
    currency: { type: String },
  },
  metadata: { type: MetadataSchema },

  cancellation_details: {
    party: { type: String },
    reason: { type: String },
  },
  capturedAt: Date, // Оплачен платёж.
  createdAt: Date, //Создан платёж.
  expiresAt: Date, //Создан платёж.
});

export const PaymentNotificationModel = model<TPaymentNotificationDocument>(
  'PaymentNotification',
  PaymentNotificationSchema
);
