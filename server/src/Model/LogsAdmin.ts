import mongoose, { Schema, model } from 'mongoose';
import { LogsAdminSchema } from '../types/model.interface.js';

const logsAdminSchema = new Schema<LogsAdminSchema>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Number },
  description: { type: String },
  event: {
    id: Number,
    name: String,
    start: Number,
  },
});

export const LogsAdmin = model<LogsAdminSchema>('LogsAdmin', logsAdminSchema);
