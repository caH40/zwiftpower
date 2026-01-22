import { z } from 'zod';

import { MongooseUtils } from '../../MongooseUtils.js';
import { RACE_SERIES_CATEGORIES, ZWIFT_CATEGORIES } from '../../../assets/constants.js';

const mongooseUtils = new MongooseUtils();

export const AddStageResultZSchema = z.object({
  category: z
    .preprocess((val) => (val === '' ? null : val), z.enum(RACE_SERIES_CATEGORIES))
    .describe('Значение категории в заезде'),

  subgroupLabel: z
    .preprocess((val) => (val === '' ? null : val), z.enum(ZWIFT_CATEGORIES))
    .describe('Группа в которой ехал райдер'),

  durationInMilliseconds: z
    .number()
    .int()
    .positive()
    .describe('Финишное время в миллисекундах'),
  stageOrder: z.number().int().positive().describe('Номер этапа'),
  profileId: z.number().int().positive().describe('ZwiftId райдера'),
  seriesId: z.string().refine((val) => mongooseUtils.checkValidObjectId(val), {
    message: 'Некорректный seriesId',
  }),
  userId: z.string().refine((val) => mongooseUtils.checkValidObjectId(val), {
    message: 'Некорректный userId',
  }),

  // Добавленные поля профиля райдера
  firstName: z
    .string()
    .min(1, 'Имя обязательно для заполнения')
    .max(100, 'Имя не может превышать 100 символов')
    .describe('Имя райдера'),

  lastName: z
    .string()
    .min(1, 'Фамилия обязательна для заполнения')
    .max(100, 'Фамилия не может превышать 100 символов')
    .describe('Фамилия райдера'),

  gender: z.enum(['male', 'female']).describe('Пол райдера (male/female)'),

  weightInGrams: z
    .number()
    .int()
    .positive('Вес должен быть положительным числом')
    .max(200000, 'Вес не может превышать 200 кг')
    .describe('Вес райдера в граммах'),

  heightInCentimeters: z
    .number()
    .positive('Рост должен быть положительным числом')
    .max(2500, 'Рост не может превышать 250 см')
    .describe('Рост райдера в сантиметрах'),

  age: z
    .number()
    .int()
    .positive('Возраст должен быть положительным числом')
    .max(120, 'Возраст не может превышать 120 лет')
    .describe('Возраст райдера'),

  avgWatts: z
    .number()
    .int()
    .positive('Ватты должен быть положительным числом')
    .describe('Средние ватты за заезд'),

  heartRateData: z
    .number()
    .int()
    .nonnegative('Средний пульс не может быть отрицательным числом')
    .describe('Средний пульс за заезд'),

  imageSrc: z.string().nullable().describe('Ссылка на лого райдера'),
  countryAlpha3: z.string().describe('Код страны'),
});
