import { z } from 'zod';
import { MongooseUtils } from '../MongooseUtils.js';
import { EXTERNAL_SERVICES } from '../../assets/constants.js';

const mongooseUtils = new MongooseUtils();

export const ExternalAccountZSchema = z.object({
  userId: z.string().refine((value) => mongooseUtils.checkValidObjectId(value), {
    message: 'Некорректный ObjectId (id пользователя в БД)',
  }),

  service: z.enum(EXTERNAL_SERVICES).describe('Сервис внешнего аккаунта'),

  accountId: z
    .union([z.string(), z.number()])
    .refine((value) => !Number.isNaN(Number(value)), {
      message: 'accountId должен быть числом',
    })
    .transform((value) => Number(value))
    .refine((value) => Number.isInteger(value) && value >= 3, {
      message: 'accountId должен быть целым числом >= 3',
    })
    .describe('ID аккаунта'),
});
