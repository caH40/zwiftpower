import { Schema, model } from 'mongoose';

// types
import { TRiderDailyMetric } from '../types/model.interface.js';

// Определение схемы для коллекции 'riderMetrics'.
const RiderDailyMetricSchema = new Schema<TRiderDailyMetric>({
  zwiftId: { type: Number, required: true },
  date: { type: Date, required: true },
  metrics: {
    racingScore: { type: Number, default: 0 },
    weightInGrams: { type: Number, default: 0 },
    heightInCentimeters: { type: Number, default: 0 },
  },
});

// Добавление TTL индекса для автоматического удаления данных старше 1 года.
RiderDailyMetricSchema.index({ date: 1 }, { expireAfterSeconds: 31536000 });

// Экспорт модели, чтобы использовать её в приложении
export const RiderDailyMetricModel = model<TRiderDailyMetric>(
  'RiderDailyMetric',
  RiderDailyMetricSchema
);
