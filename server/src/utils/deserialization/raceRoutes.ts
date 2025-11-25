import { z } from 'zod';

export const RaceRouteIdsZSchema = z.string().transform((str, ctx) => {
  try {
    const parsed = JSON.parse(str);
    return z.array(z.number()).parse(parsed);
  } catch (error) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid JSON array of numbers',
    });
    return z.NEVER;
  }
});
