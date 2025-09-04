import { model, Schema } from 'mongoose';

import { CURRENCY, ENTITY_NAME_SLOTS, PURCHASE_UNITS } from '../assets/constants.js';

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
    item: {
      quantity: { type: Number, default: 1 },
      unit: { type: String, enum: PURCHASE_UNITS, required: true },
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
//   name: 'Организатор заездов',
//   entityName: 'organizer', // одно из значений из ENTITY_NAME_SLOTS
//   description:
//     'Создание серий заездов и туров. Создание, редактирования заездов с расширенными настройками в ZwiftСоздание серий заездов и туров с полной интеграцией в Zwift. Позволяет создавать и редактировать заезды с расширенными настройками: категории участников, маршруты, лимиты мощности, тайминги и уровни сложности. Удобно для организации соревнований, турниров и тренировок с автоматическим обновлением участников и доступной статистикой. Сервис сроком на 31 день',
//   amount: {
//     value: 2000,
//     currency: 'RUB', // одно из значений из CURRENCY
//   },
//   item: {
//     quantity: 1,
//     unit: 'month',
//   },
//   createdAt: new Date(),
//   updatedAt: new Date(),
// });
