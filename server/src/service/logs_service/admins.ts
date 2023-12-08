import { LogsAdmin } from '../../Model/LogsAdmin.js';
import { filterLogs } from './filter-admins.js';

// types
import { GetLogsAdmins } from '../../types/http.interface.js';
import { LogsAdminUsername } from '../../types/types.interface.js';

/**
 * Сервис по обработке запроса логов по действиям админов(модераторов)
 */
export async function getLogsAdminsService({
  page = 1,
  docsOnPage = 20,
  search,
}: GetLogsAdmins) {
  const logsDB: LogsAdminUsername[] = await LogsAdmin.find()
    .sort({ date: -1 })
    .populate({ path: 'userId', select: 'username' });

  // фильтрация найденных логов по ключевому слову search
  const logsFiltered = filterLogs(logsDB, search);

  const quantityPages = Math.ceil(logsFiltered.length / docsOnPage);

  const sliceStart = page * docsOnPage - docsOnPage;
  const sliceEnd = docsOnPage * page;
  const logsSliced = logsFiltered.slice(sliceStart, sliceEnd);

  return {
    logs: logsSliced,
    quantityPages,
    page,
    message: 'Логи о действиях админов (модераторов)',
  };
}
