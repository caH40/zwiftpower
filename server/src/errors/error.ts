import { Response } from 'express';
import { AxiosError } from 'axios';

import { nodeEnvType } from '../config/environment.js';
import { logError } from '../logger/logger.js';
import { ignoreError } from './ignore.js';
import { parseError } from './parse.js';
import { logErrorToDB } from '../logger/logger-db.js';

/**
 * Функция выбирает способ и необходимость логирования ошибок.
 */
export const handleAndLogError = (error: unknown): void => {
  try {
    // выход, если ошибка из списка игнорируемых
    if (ignoreError(error)) {
      return;
    }

    if (nodeEnvType === 'development') {
      // если разработка, то выводить ошибку в консоль
      console.log(error); // eslint-disable-line
    } else {
      // логирование ошибки в БД
      const errorParsed = parseError(error);
      logErrorToDB(errorParsed);
    }
  } catch (error) {
    // при ошибке выполнения текущего модуля сохранять в файл
    const errorParsed = parseError(error);
    logError(errorParsed);
    console.log(error); // eslint-disable-line
  }
};

/**
 * Функция для централизованной обработки ошибок в контроллерах
 */
export function handleErrorInController(res: Response, error: unknown) {
  // Логируем ошибку с помощью внешнего обработчика.
  handleAndLogError(error);

  if (error instanceof AxiosError) {
    // Ошибки от Axios (например, 401 или 400).
    if (error.response) {
      return res.status(error.response.status || 400).json({
        message:
          error.response.data?.message ||
          error.response.data?.key ||
          'Ошибка при запросе к стороннему API',
      });
    }
    return res.status(500).json({ message: 'Ошибка сети или сервера Axios' });
  }

  if (error instanceof Error) {
    // Обычные ошибки.
    return res.status(400).json({ message: error.message });
  }

  // Непредвиденные ошибки.
  return res.status(500).json({ message: 'Произошла неизвестная ошибка' });
}
