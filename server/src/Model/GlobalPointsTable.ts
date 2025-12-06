import { Document, model, Schema } from 'mongoose';

import { RacePointsRuleSchema } from './Schema/RacePointsRuleSchema';

// types
import { TGlobalPointsTable } from '../types/model.interface';

type TGlobalPointsTableDocument = TGlobalPointsTable & Omit<Document, '_id'>;

/**
 * Таблица начисления очков для разных сущностей сайта.
 */
const GlobalPointsTableSchema = new Schema<TGlobalPointsTableDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    rules: { type: [RacePointsRuleSchema], default: [] },
    fallbackPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const GlobalPointsTableModel = model<TGlobalPointsTableDocument>(
  'GlobalPointsTable',
  GlobalPointsTableSchema
);
