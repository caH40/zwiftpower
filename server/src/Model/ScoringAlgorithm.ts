import mongoose, { Schema, model } from 'mongoose';
import { TScoringAlgorithm } from '../types/model.interface';

export interface IScoringAlgorithm extends Omit<TScoringAlgorithm, '_id'>, mongoose.Document {}

const ScoringAlgorithmSchema = new Schema<IScoringAlgorithm>({
  name: { type: String, required: true }, // Например, 'Обычная серия'
  description: { type: String }, // Например, 'Стандартная система начисления очков для серии'
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true }, // Организатор серии
});

export const ScoringAlgorithmModel = model<IScoringAlgorithm>(
  'ScoringAlgorithm',
  ScoringAlgorithmSchema
);
