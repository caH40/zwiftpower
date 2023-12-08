import { descriptionLogsAdmins } from '../../assets/logs/admins.js';

// types
import { LogsAdminUsername } from '../../types/types.interface.js';

/**
 *  Фильтрация найденных логов по ключевому слову search
 */
export const filterLogs = (logs: LogsAdminUsername[], search: string | undefined) => {
  if (!search) {
    return logs;
  }

  const logsFiltered = logs.filter((log) => {
    if (descriptionLogsAdmins[log.description].toLowerCase().includes(search.toLowerCase())) {
      return true;
    }

    if (log.userId.username.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }

    if (log.event.name.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }

    if (log.event.id.toString().includes(search)) {
      return true;
    }

    return false;
  });

  return logsFiltered;
};
