// types
import { LogsErrorSchema } from '../../types/model.interface.js';
import { getTimerLocal } from '../../utils/date-local.js';

/**
 *  Фильтрация найденных логов по ключевому слову search
 */
export const filterLogsErrors = (logs: LogsErrorSchema[], search: string | undefined) => {
  if (!search) {
    return logs;
  }

  const logsFiltered = logs.filter((log) => {
    if (getTimerLocal(log.timestamp, 'DDMMYYHm').includes(search)) {
      return true;
    }
    if (log.type?.toLowerCase()?.includes(search.toLowerCase())) {
      return true;
    }
    if (log.responseData?.toLowerCase()?.includes(search.toLowerCase())) {
      return true;
    }
    if (log.message?.toLowerCase()?.includes(search.toLowerCase())) {
      return true;
    }
    if (log.stack?.toLowerCase()?.includes(search.toLowerCase())) {
      return true;
    }
  });

  return logsFiltered;
};
