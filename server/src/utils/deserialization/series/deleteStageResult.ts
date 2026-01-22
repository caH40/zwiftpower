import { z } from 'zod';

import { MongooseUtils } from '../../MongooseUtils.js';

const mongooseUtils = new MongooseUtils();

export const DeleteStageResultZSchema = z.object({
  userId: z.string().refine((val) => mongooseUtils.checkValidObjectId(val), {
    message: 'Некорректный userId',
  }),

  resultId: z.string().refine((val) => mongooseUtils.checkValidObjectId(val), {
    message: 'Некорректный userId',
  }),
});
