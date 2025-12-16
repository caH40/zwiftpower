import { z } from 'zod';
import { parseSeasonLabel } from '../season.js';

export const TeamRatingResultsZSchema = z.object({
  seasonLabel: z.string().refine(
    (value) => !!parseSeasonLabel(value),
    (value) => ({ message: `Не корректное название сезона! Получено: ${value}` })
  ),
  teamUrlSlug: z.string(),
});
