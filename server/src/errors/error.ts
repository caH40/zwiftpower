import { nodeEnvType } from '../config/environment.js';
import { logError } from '../logger/logger.js';
import { ignoreError } from './ignore.js';
import { parseError } from './parse.js';
import { logErrorToDB } from '../logger/logger-db.js';

export const errorHandler = (error: unknown): void => {
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
