import { LogError } from '../Model/LogError.js';
import { parseError } from '../errors/parse.js';
import { logError } from './logger.js';

// types
import { LogErrorSchema } from '../types/model.interface.js';

/**
 * Сохраняет данные об ошибке в БД
 * @param error распарсенные данные об ошибке
 */
export async function logErrorToDB(error: Omit<LogErrorSchema, 'timestamp'>): Promise<void> {
  try {
    const response = await LogError.create({ ...error, timestamp: Date.now() });
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
