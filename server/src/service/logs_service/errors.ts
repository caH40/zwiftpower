import { LogsErrorSchema } from '../../types/model.interface.js';
import { filterLogsErrors } from './filter-errors.js';
import { getCurrentDocsOnPage } from '../../utils/pagination.js';

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

  // фильтрация найденных логов по ключевому слову search
  const logsFiltered = filterLogsErrors(logsDB, search);

  const { currentDocs, currentPage, quantityPages } = getCurrentDocsOnPage(
    logsFiltered,
    page,
    docsOnPage
  );

  return {
    logs: currentDocs,
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
