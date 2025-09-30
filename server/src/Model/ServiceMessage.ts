import mongoose, { Document, model, Schema } from 'mongoose';

import { SERVICE_MESSAGE_TYPE } from '../assets/service_message/constants.js';

// types
import { TServiceMessage } from '../types/model.interface.js';

export type TServiceMessageDocument = TServiceMessage & Document;

const ServiceMessageSchema = new Schema<TServiceMessageDocument>({
  recipientUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  initiatorUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: SERVICE_MESSAGE_TYPE, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  entityUrl: { type: String },
  externalEntityUrl: { type: String },
  entityLogo: { type: String },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: () => new Date() },
});

ServiceMessageSchema.index({ recipientUser: 1, createdAt: -1 });

export const ServiceMessageModel = model<TServiceMessageDocument>(
  'ServiceMessage',
  ServiceMessageSchema
);
