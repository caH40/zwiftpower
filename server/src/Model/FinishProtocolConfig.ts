import mongoose, { Schema, Types, model, Document } from 'mongoose';
import { TFinishProtocolConfig } from '../types/model.interface.js';

export interface IFinishProtocolConfigDocument
  extends Omit<TFinishProtocolConfig, '_id'>,
    Document {
  _id: Types.ObjectId; // FIXME: Протестить, нужно ли это! Добавлено явное указание _id}
}

/**
 * Схема и модель для конфигураций финишных протоколов. Разграничения между организаторами.
 * По названию конфига вы выбирается обработчик финишного протокола (Обработчики жестко закодированы).
 */
const FinishProtocolConfigSchema = new Schema<IFinishProtocolConfigDocument>(
  {
    organizer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Organizer' },
    name: { type: String, required: true, trim: true },
    displayName: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

export const FinishProtocolConfigModel = model<IFinishProtocolConfigDocument>(
  'FinishProtocolConfig',
  FinishProtocolConfigSchema
);
