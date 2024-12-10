import { NextFunction, Request, Response } from 'express';
import { createClient } from 'redis';

import { handleAndLogError } from '../errors/error.js';

/**
 * Проверка наличия данных в Кэше
 * Если есть, то отправляются данные из Кэша,
 * Если нет формируются данные с помощью соответствующего сервиса
 */
export const getCache = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = await createClient()
      .on('error', (error) => handleAndLogError(error))
      .connect();

    const path = req.path;
    const cachedData = await client.get(path);

    if (!cachedData) {
      return next();
    }

    res.status(200).json(JSON.parse(cachedData));
  } catch (error) {
    return next();
  }
};
