import { Schema, model } from 'mongoose';

// types
import { LogErrorSchema } from '../types/model.interface.js';

const logErrorSchema = new Schema<LogErrorSchema>({
  timestamp: Number,
  type: String,
  message: String,
  responseData: String,
  stack: String,
  config: { type: Object, default: null },
});

export const LogError = model('LogError', logErrorSchema);
