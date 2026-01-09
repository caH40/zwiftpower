import { z } from 'zod';

import { safeJsonParse } from '../utils.js';
import { RIDER_CATEGORIES_RULE_TYPES } from '../../../assets/constants.js';

// types
import { TFinishTimeLimitOnStage } from '../../../types/series.types.js';

const finishTimeLimitOnStageSchema = z
  .string()
  .transform(safeJsonParse)
  .refine((val): val is TFinishTimeLimitOnStage => val !== null, {
    message: 'Невалидный JSON формат',
  })
  // Проверяем, что percentageFromLeader - это НЕ NaN (корректное число)
  .refine(
    (val) => {
      // Преобразуем строку в число и проверяем, что это валидное число
      const percentage = Number(val.percentageFromLeader);
      return !isNaN(percentage) && percentage >= 0 && percentage <= 100;
    },
    {
      message: 'percentageFromLeader должен быть числом от 0 до 100',
    }
  )
  .transform((val) => ({ ...val, percentageFromLeader: Number(val.percentageFromLeader) }))
  // Проверяем поле enforcement
  .refine(
    (val: { enforcement: 'manual' | 'auto' }) => {
      return val.enforcement === 'manual' || val.enforcement === 'auto';
    },
    {
      message: "enforcement должен быть 'manual' или 'auto'",
    }
  )
  .describe('Параметры лимита времени на финише этапа');

// Основная схема для данных Серии.
export const SeriesDataZSchema = z
  .object({
    hasGeneral: z
      .string()
      .refine((val) => val === 'true' || val === 'false', {
        message: 'hasGeneral должно быть строкой "true" или "false".',
      })
      .transform((val) => val === 'true') // Преобразуем строку в булево значение.
      .optional()
      .describe('Есть ли общий зачет в серии.'),

    hasTeams: z
      .string()
      .refine((val) => val === 'true' || val === 'false', {
        message: 'hasTeams должно быть строкой "true" или "false".',
      })
      .transform((val) => val === 'true') // Преобразуем строку в булево значение.
      .optional()
      .describe('Подсчет командного зачета.'),

    isFinished: z
      .string()
      .refine((val) => val === 'true' || val === 'false', {
        message: 'isFinished должно быть строкой "true" или "false".',
      })
      .transform((val) => val === 'true') // Преобразуем строку в булево значение.
      .optional()
      .describe('Флаг завершения серии.'),

    dateStart: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'dateStart должно быть валидной датой в формате ISO 8601.',
      })
      .transform((val) => new Date(val)) // Преобразуем строку в объект Date.
      .describe('Дата старта Серии заездов.'),

    riderCategoryRule: z
      .preprocess(
        (val) => (val === '' ? null : val),
        z.enum(RIDER_CATEGORIES_RULE_TYPES).nullable()
      )
      .describe('Новое значение категории'),

    dateEnd: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'dateStart должно быть валидной датой в формате ISO 8601.',
      })
      .transform((val) => new Date(val)) // Преобразуем строку в объект Date.
      .describe('Дата завершения Серии заездов.'),

    description: z
      .string()
      .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON.
      .optional()
      .describe('Полное описание серии.'),

    mission: z
      .string()
      .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON.
      .optional()
      .describe('Цель или миссия серии.'),

    name: z
      .string()
      .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON.
      .describe('Название серии заездов.'),

    scoringTable: z
      .string()
      .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON.
      .optional()
      .describe('_id документа с расчетом очков за места в протоколе.'),

    prizes: z
      .string()
      .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON.
      .optional()
      .describe('Описание призов (если есть)'),

    rules: z
      .string()
      .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON.
      .optional()
      .describe('Описание правил серии (может быть ссылкой).'),

    scoringAlgorithmsId: z
      .string()
      .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON.
      .optional()
      .describe('_id алгоритма построения таблиц результатов.'),

    // stages: z
    //   .string()
    //   .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON.
    //   .optional()
    //   .describe('Список этапов с нумерацией.'),

    type: z
      .string()
      .transform(safeJsonParse) // Преобразуем строку в объект, если это JSON.
      .describe('Тип серии.'),

    seriesId: z
      .string()
      .transform(safeJsonParse)
      .optional()
      .describe('_id редактируемой серии, если данные из формы редактирования.'),

    finishTimeLimitOnStage: finishTimeLimitOnStageSchema,
  })
  .refine(
    (data) => {
      // Убираем поля с значением `undefined`
      const filteredData = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(data).filter(([_, v]) => v !== undefined)
      );
      return filteredData;
    },
    {
      message: 'Некоторые поля имеют значение undefined и не должны быть включены в объект.',
    }
  );
