import mongoose, { Schema, model, Types, Document } from 'mongoose';

// types
import { TSeriesClassification } from '../types/model.interface';
import {
  disqualificationSchema,
  GapsInCategoriesSchema,
  profileDataSchema,
} from './StageResult.js';

// Интерфейс для результата в генеральном зачете тура.
export interface ISeriesClassification extends Omit<TSeriesClassification, '_id'>, Document {
  _id: Types.ObjectId;
}

// Схема этапа
const stageSchema = new Schema(
  {
    category: { type: String, default: null }, // Категория.
    stageOrder: { type: Number, required: true }, // Порядковый номер этапа.
    durationInMilliseconds: { type: Number, default: 0 }, // Время этапа.
    // includeInTotal: { type: Boolean, default: true }, // Влияет ли этап на суммарные очки.
    finishPoints: { type: Number, default: 0 }, // Очки за этап (если есть).
    profileData: { type: profileDataSchema, default: null },
  },
  { _id: false }
);

// Основная схема для генеральной классификации
const seriesClassificationSchema = new Schema(
  {
    seriesId: { type: mongoose.Schema.Types.ObjectId, required: true }, // _id серии из БД.
    rank: {
      category: { type: Number, default: 0 },
      absolute: { type: Number, default: 0 },
    }, // Итоговое место в генеральной классификации.
    finalCategory: { type: String, default: null }, // Категория, по которой райдер участвует в зачёте и рассчитывается rank.
    profileId: { type: Number, required: true }, // ZwiftId райдера.
    totalFinishPoints: { type: Number, default: 0 }, // Суммарные очки за серию.
    totalTimeInMilliseconds: { type: Number, default: 0 }, // Общее время за все этапы.
    stagesCompleted: { type: Number, default: 0 }, // Количество завершённых этапов.
    disqualification: { type: disqualificationSchema }, // Статус дисквалификации.
    gapsInCategories: GapsInCategoriesSchema, // Отрывы между участником результата и лидером, предыдущим в категории и абсолюте.
    stages: { type: [stageSchema], default: [] }, // Массив этапов.
    teamSquadAtRace: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamSquad', default: null }, // Состав команды на этапе.
  },
  { timestamps: true }
);

// Добавляем индексы.
seriesClassificationSchema.index({ seriesId: 1, profileId: 1 }); // Комбинированный индекс для серии и райдера.
seriesClassificationSchema.index({ seriesId: 1 }); // Индекс для seriesId для ускорения поиска по серии.
seriesClassificationSchema.index({ profileId: 1 }); // Индекс для profileId для ускорения поиска по райдеру.

// Модель для работы с коллекцией TourGeneralClassification
export const SeriesClassificationModel = model<ISeriesClassification>(
  'SeriesClassification',
  seriesClassificationSchema
);
