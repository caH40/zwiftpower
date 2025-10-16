import { z } from 'zod';

import { numericString } from './utils.js';

export const userResultsZSchema = z.object({
  page: numericString.transform(Number).optional().describe('Номер страницы'),

  docsOnPage: numericString
    .transform(Number)
    .optional()
    .describe('Количество документов на странице'),

  zwiftId: numericString.transform(Number).describe('ZwiftId райдера'),

  columnName: z
    .string()
    .min(1, 'Название колонки не может быть пустым')
    .describe('Название колонки по которой идет сортировка таблицы'),

  isRasing: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .describe('Порядок сортировки (возрастание/убывание)'),
});
