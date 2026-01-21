import { z } from 'zod';

import { MongooseUtils } from '../../MongooseUtils.js';

const mongooseUtils = new MongooseUtils();

export const AddStageResultZSchema = z.object({
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
});
