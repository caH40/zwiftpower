import { z } from 'zod';
import { RACE_SERIES_CATEGORIES } from '../../../assets/constants.js';

export const CategoryZSchema = z.object({
  userId: z
    .string()
    .describe('_id Модератора, осуществляющего изменение категории участнику заезда'),
  seriesId: z.string().describe('_id Серии заездов'),
  stageResultId: z.string().describe('_id Результата заезда этапа серии заездов'),
  value: z
    .preprocess((val) => (val === '' ? null : val), z.enum(RACE_SERIES_CATEGORIES).nullable())
    .describe('Новое значение категории'),
  reason: z.string().optional().describe('Причина изменения категории'),
});
