import { model, Schema } from 'mongoose';

import { CURRENCY, ENTITY_NAME_SLOTS } from '../assets/constants.js';

// types
import { TSiteServicePriceDocument } from '../types/model.interface.js';

/**
 * Схема MongoDB для хранения цен услуг на сайте.
 */
const SiteServicePriceSchema = new Schema<TSiteServicePriceDocument>(
  {
    name: { type: String, required: true, trim: true },
    entityName: { type: String, enum: ENTITY_NAME_SLOTS, required: true, unique: true },
    description: { type: String, required: true },
    amount: {
      value: { type: Number, required: true, min: 0 },
      currency: { type: String, enum: CURRENCY, required: true },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const SiteServicePriceModel = model<TSiteServicePriceDocument>(
  'SiteServicePrice',
  SiteServicePriceSchema
);
// db.siteserviceprices.insertOne({
//   name: "Разработка сайта",
//   entityName: "organizer", // одно из значений из ENTITY_NAME_SLOTS
//   description: "Создание одностраничного сайта под ключ",
//   amount: {
//     value: 15000,
//     currency: "RUB" // одно из значений из CURRENCY
//   },
//   createdAt: new Date(),
//   updatedAt: new Date()
// })
