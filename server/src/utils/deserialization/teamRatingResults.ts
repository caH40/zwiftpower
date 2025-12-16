import { z } from 'zod';
import { MongooseUtils } from '../MongooseUtils.js';
import { parseSeasonLabel } from '../season.js';

const mongooseUtils = new MongooseUtils();

export const TeamRatingResultsZSchema = z.object({
  seasonLabel: z.string().refine(
    (value) => !!parseSeasonLabel(value),
    (value) => ({ message: `Не корректное название сезона! Получено: ${value}` })
  ),
  teamId: z.string().refine(
    (value) => mongooseUtils.checkValidObjectId(value),
    (value) => ({ message: `Некорректный ObjectId у значения teamId. Получено: ${value}` })
  ),
});
