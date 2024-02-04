import { createClient } from 'redis';
import { errorHandler } from '../errors/error.js';
/**
 * Кэширование данных
 */
export const setCache = async (
  path: string,
  data: string,
  timeExpire: number
): Promise<void> => {
  try {
    // создание клиента для Редис
    const client = await createClient()
      .on('error', (error) => errorHandler(error))
      .connect();

    // запись в Кэш. Удаляется запись каждые 6 часов после записи её в БД-Редис.
    await client.set(path, data, { EX: timeExpire, NX: true });

    await client.disconnect();
  } catch (error) {
    errorHandler(error);
  }
};
