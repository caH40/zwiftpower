import { z } from 'zod';

import { MongooseUtils } from '../../MongooseUtils.js';
import { DISQUALIFICATION_LABELS } from '../../../assets/constants.js';

const mongooseUtils = new MongooseUtils();

// Схема для установки дисквалификации
export const SetDisqualificationZSchema = z.object({
  userId: z.string().refine((val) => mongooseUtils.checkValidObjectId(val), {
    message: 'Некорректный userId: ожидается ObjectId',
  }),

  resultId: z.string().refine((val) => mongooseUtils.checkValidObjectId(val), {
    message: 'Некорректный resultId: ожидается ObjectId',
  }),

  disqualification: z.object({
    status: z.boolean({ required_error: 'Поле status обязательно' }),
    label: z
      .enum(DISQUALIFICATION_LABELS, {
        invalid_type_error: 'Недопустимый label дисквалификации',
      })
      .optional(),
    reason: z
      .string({
        invalid_type_error: 'Поле reason должно быть строкой',
      })
      .optional(),

    moderator: z
      .string()
      .optional()
      .refine((val) => !val || mongooseUtils.checkValidObjectId(val), {
        message: 'Некорректный moderator id: ожидается ObjectId или пустое значение',
      })
      .transform((val) => (val ? mongooseUtils.convertToObjectId(val) : undefined)),
  }),
});

// Схема для удаления дисквалификации
export const RemoveDisqualificationZSchema = z.object({
  userId: z.string().refine((val) => mongooseUtils.checkValidObjectId(val), {
    message: 'Некорректный userId: ожидается ObjectId',
  }),
  resultId: z.string().refine((val) => mongooseUtils.checkValidObjectId(val), {
    message: 'Некорректный resultId: ожидается ObjectId',
  }),
});
