import { z } from 'zod';

import { MongooseUtils } from '../MongooseUtils.js';

const mongooseUtils = new MongooseUtils();

export const ObjectIdStrZSchema = z
  .string()
  .refine((val) => mongooseUtils.checkValidObjectId(val), {
    message: 'Некорректный userId',
  });
