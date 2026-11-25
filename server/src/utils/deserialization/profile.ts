import { z } from 'zod';
import { MongooseUtils } from '../MongooseUtils.js';
import { EXTERNAL_SERVICES } from '../../assets/constants.js';

const mongooseUtils = new MongooseUtils();

export const ExternalAccountZSchema = z.object({
  userId: z.string().refine((value) => mongooseUtils.checkValidObjectId(value), {
    message: 'Некорректный ObjectId (id пользователя в БД)',
  }),

  service: z.enum(EXTERNAL_SERVICES).describe('Сервис внешнего аккаунта'),

  accountId: z.string().describe('ID аккаунта'),
});
