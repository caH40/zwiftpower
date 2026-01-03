import { z } from 'zod';

const TimePenaltyElementArrayZSchema = z.object({
  timeInMilliseconds: z
    .number()
    .int()
    .nonnegative()
    .describe('Величина штрафа в миллисекундах'),

  reason: z.string().describe('Причина изменения категории'),
  modifiedAt: z.string().describe('Дата и время изменения категории'),
  moderator: z.object({
    username: z.string().describe('Модератор, который изменил категорию'),
    _id: z.string().describe('_id модератора, который изменил категорию'),
  }),
});
export const TimePenaltyZSchema = z.object({
  userId: z
    .string()
    .describe('_id Модератора, осуществляющего изменение категории участнику заезда'),
  seriesId: z.string().describe('_id Серии заездов'),
  stageResultId: z.string().describe('_id Результата заезда этапа серии заездов'),

  timePenalty: z.array(TimePenaltyElementArrayZSchema),
});
