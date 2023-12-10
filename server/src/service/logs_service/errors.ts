import { LogsErrorSchema } from '../../types/model.interface.js';
import { filterLogsErrors } from './filter-errors.js';

// types
import { LogsError } from '../../Model/LogsError.js';
import { GetLogsAdmins } from '../../types/http.interface.js';

/**
 * Сервис по обработке запроса логов Ошибок
 */
export async function getLogsErrorsService({
  page = 1,
  docsOnPage = 20,
  search,
}: GetLogsAdmins) {
  const logsDB: LogsErrorSchema[] = await LogsError.find().lean().sort({ timestamp: -1 });
  let currentPage = page;

  // фильтрация найденных логов по ключевому слову search
  const logsFiltered = filterLogsErrors(logsDB, search);

  const quantityPages = Math.ceil(logsFiltered.length / docsOnPage);

  // если запрашиваемая страница page больше количество страниц quantityPages
  if (quantityPages - page < 0) {
    currentPage = quantityPages;
  }

  const sliceStart = currentPage * docsOnPage - docsOnPage;
  const sliceEnd = docsOnPage * currentPage;

  const logsSliced = logsFiltered.slice(sliceStart, sliceEnd);

  return {
    logs: logsSliced,
    quantityPages,
    page: currentPage,
    message: 'Логи ошибок на сервере',
  };
}

/**
 * Сервис по обработке запроса логов Ошибок
 */
export async function getLogErrorService(id: string) {
  const logsDB: LogsErrorSchema | null = await LogsError.findById(id).lean();

  return logsDB;
}

/**
 * Сервис удаления лого ошибок
 */
export async function deleteLogErrorService(ids: string[]) {
  const response = await LogsError.deleteMany({ _id: ids });

  return { message: `Удалено логов ошибок: ${response?.deletedCount} шт.` };
}
