import mongoose, { Document, model, Schema } from 'mongoose';

import { SERVICE_MESSAGE_TYPE } from '../assets/constants/team';

// types
import { TServiceMessage } from '../types/model.interface';

type TServiceMessageDocument = TServiceMessage & Document;

const ServiceMessageSchema = new Schema<TServiceMessageDocument>({
  recipientUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  initiatorUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: SERVICE_MESSAGE_TYPE, required: true },
  templateKey: { type: String, required: true },
  text: { type: String },
  metadata: { type: Schema.Types.Mixed },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: () => new Date() },
});

export const ServiceMessageModel = model<TServiceMessageDocument>(
  'ServiceMessage',
  ServiceMessageSchema
);
