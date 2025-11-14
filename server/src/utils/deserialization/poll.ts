import { z } from 'zod';
import { MongooseUtils } from '../MongooseUtils.js';

const mongooseUtils = new MongooseUtils();

export const PollOptionZSchema = z.object({
  optionId: z.number().int().nonnegative().describe('локальный ID варианта'),
  title: z.string().min(2).describe('Название опции для голоса'),
});

export const PollZSchema = z.object({
  creator: z.string().refine((value) => mongooseUtils.checkValidObjectId(value), {
    message: 'Некорректный ObjectId',
  }),
  title: z.string().min(2).describe('Заголовок голосования'),
  options: z.array(PollOptionZSchema).min(1).describe('Варианты ответа'),

  isAnonymous: z.boolean(),
  multipleAnswersAllowed: z.boolean(),

  startDate: z.preprocess(
    (val) => (typeof val === 'string' || typeof val === 'number' ? new Date(val) : val),
    z.date()
  ),

  endDate: z.preprocess(
    (val) => (typeof val === 'string' || typeof val === 'number' ? new Date(val) : val),
    z.date()
  ),
});
