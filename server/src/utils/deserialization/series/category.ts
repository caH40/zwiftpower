import { z } from 'zod';
import { CATEGORIES_SERIES } from '../../../assets/constants.js';

export const CategoryZSchema = z.object({
  userId: z
    .string()
    .describe('_id Модератора, осуществляющего изменение категории участнику заезда'),
  seriesId: z.string().describe('_id Серии заездов'),
  stageResultId: z.string().describe('_id Результата заезда этапа серии заездов'),
  value: z
    .preprocess((val) => (val === '' ? null : val), z.enum(CATEGORIES_SERIES).nullable())
    .describe('Новое значение категории'),
  reason: z.string().optional().describe('Причина изменения категории'),
});
