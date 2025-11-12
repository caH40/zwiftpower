import { z } from 'zod';
import { SERIES_STATUS } from '../../../assets/constants.js';

export const SeriesZSchema = z.object({
  organizerSlug: z.string().optional(),
  seriesStatus: z.enum(SERIES_STATUS).optional(),
});
