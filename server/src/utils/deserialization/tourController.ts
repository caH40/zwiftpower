import { z } from 'zod';
import { MongooseUtils } from '../MongooseUtils.js';

const mongooseUtils = new MongooseUtils();

export const UpdateStageResultsSchema = z.object({
  seriesId: z.string().refine((value) => mongooseUtils.checkValidObjectId(value), {
    message: 'Некорректный ObjectId',
  }), // Используем кастомную валидацию
  stageOrder: z
    .number()
    .int('Порядок этапа должен быть целым числом')
    .positive('Порядок этапа должен быть положительным числом')
    .max(100, 'Порядок этапа не может превышать 100'),
});
