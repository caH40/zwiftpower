import mongoose, { Schema, model } from 'mongoose';

// types
import { TScoringEntry, TScoringTable } from '../types/model.interface';

/**
 * Интерфейс документа, объединяющий `TScoringTable` с `Document`.
 */
export interface IScoringTableDocument extends TScoringTable, Document {} // Расширяем интерфейс.

/**
 * Схема записи в таблице начисления очков (для конкретного места).
 */
const ScoringEntrySchema = new Schema<TScoringEntry>(
  {
    rank: { type: Number, required: true, min: 1 }, // Место в гонке.
    points: { type: Number, required: true, min: 0 }, // Очки за место.
  },
  { _id: false }
);

/**
 * Схема таблицы начисления очков для гонки или серии гонок.
 */
const ScoringTableSchema = new Schema<IScoringTableDocument>({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ссылка на создателя таблицы.
  name: { type: String, required: true, trim: true }, // Название таблицы начисления очков.
  entries: { type: [ScoringEntrySchema], required: true }, // Список начисления очков.
});

export const ScoringTableModel = model<IScoringTableDocument>(
  'ScoringTable',
  ScoringTableSchema
);
