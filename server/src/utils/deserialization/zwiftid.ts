import { z } from 'zod';

/**
 * Проверка zwiftId должны быть только цифры не более 9 знаков
 */
export const ZwiftIdZSchema = z.coerce
  .string()
  .regex(/^\d+$/, 'Zwift ID должен содержать только цифры')
  .max(9, 'Zwift ID не должен превышать 9 символов')
  .min(1, 'Zwift ID не может быть пустым!')
  .transform((val) => parseInt(val, 10));
