/**
 * N Означает что создана новая схема, дополнительно к старой.
 * В дальнейшем необходимо заменить старую на новую.
 */
import mongoose, { Schema, model } from 'mongoose';
import {
  TScoringAlgorithm,
  TSeries,
  TSeriesStage,
  TSeriesType,
} from '../types/model.interface';
import { FileMetadataSchema } from './FileMetadataSchema.js';

export interface ISeriesDocument extends Omit<TSeries, '_id'>, Document {
  scoringAlgorithms: TScoringAlgorithm;
  type: TSeriesType;
}

const SeriesStageSchema = new Schema<TSeriesStage>(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'ZwiftEvent', required: true },
    order: { type: Number, default: 0 },
    label: { type: String },
    includeResults: { type: Boolean, default: true },
  },
  { _id: false }
);

const NSeriesSchema = new Schema<ISeriesDocument>({
  dateEnd: { type: Date, required: true },
  dateStart: { type: Date, required: true },
  description: { type: String },
  hasGeneral: { type: Boolean, default: false },
  hasTeams: { type: Boolean, default: false },
  isFinished: { type: Boolean, default: false },
  logoFileInfo: { type: FileMetadataSchema },
  mission: { type: String },
  name: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true },
  scoringTable: { type: mongoose.Schema.Types.ObjectId, ref: 'ScoringTable' },
  posterFileInfo: { type: FileMetadataSchema },
  prizes: { type: String },
  rules: { type: String },
  scoringAlgorithms: { type: mongoose.Schema.Types.ObjectId, ref: 'ScoringAlgorithm' },
  stages: { type: [SeriesStageSchema] },
  type: { type: String, required: true },
  urlSlug: { type: String, required: true, unique: true },
});

export const NSeriesModel = model<ISeriesDocument>('NSeries', NSeriesSchema);
