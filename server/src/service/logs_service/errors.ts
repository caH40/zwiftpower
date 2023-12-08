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

  // фильтрация найденных логов по ключевому слову search
  const logsFiltered = filterLogsErrors(logsDB, search);

  const quantityPages = Math.ceil(logsFiltered.length / docsOnPage);

  const sliceStart = page * docsOnPage - docsOnPage;
  const sliceEnd = docsOnPage * page;
  const logsSliced = logsFiltered.slice(sliceStart, sliceEnd);

  return {
    logs: logsSliced,
    quantityPages,
    page,
    message: 'Логи ошибок на сервере',
  };
}
