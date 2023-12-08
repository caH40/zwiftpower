import { Schema, model } from 'mongoose';

// types
import { LogsErrorSchema } from '../types/model.interface.js';

const logsErrorSchema = new Schema<LogsErrorSchema>({
  timestamp: Number,
  type: String,
  message: String,
  responseData: String,
  stack: String,
  config: { type: Object, default: null },
});

export const LogsError = model('LogsError', logsErrorSchema);
