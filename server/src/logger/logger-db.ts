import { LogsError } from '../Model/LogsError.js';
import { parseError } from '../errors/parse.js';
import { logError } from './logger.js';

// types
import { LogsErrorSchema } from '../types/model.interface.js';

/**
 * Сохраняет данные об ошибке в БД
 * @param error распарсенные данные об ошибке
 */
export async function logErrorToDB(error: Omit<LogsErrorSchema, 'timestamp'>): Promise<void> {
  try {
    const response = await LogsError.create({ ...error, timestamp: Date.now() });
    if (!response) {
      throw new Error('Ошибка при сохранении лога в БД');
    }
  } catch (error) {
    // при ошибке выполнения текущего модуля сохранять в файл
    const errorParsed = parseError(error);
    logError(errorParsed);
    console.log(error); // eslint-disable-line
  }
}
