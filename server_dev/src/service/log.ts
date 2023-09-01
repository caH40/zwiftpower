import { LogsAdmin } from '../Model/LogsAdmin.js';
import { descriptionLogsAdmins } from '../asset/logs/admins.js';
import { GetLogsAdmins } from '../types/http.interface.js';

export async function loggingAdmin(eventId, eventName, eventStart, userId, description) {
  try {
    await LogsAdmin.create({
      userId,
      date: Date.now(),
      description,
      event: {
        id: eventId,
        name: eventName,
        start: new Date(eventStart).getTime(),
      },
    });
    return { message: 'Успешное сохранение информации о действии админа (модератора)' };
  } catch (error) {
    console.error(error);
  }
}
export async function getLogsAdminsService({
  page = 1,
  docsOnPage = 20,
  search,
}: GetLogsAdmins) {
  try {
    const logsDB = await LogsAdmin.find()
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
  } catch (error) {
    console.error(error);
  }
}

function filterLogs(logs, search) {
  try {
    const logsFiltered = logs.filter((log) => {
      if (!search) return true;
      if (descriptionLogsAdmins[log.description].toLowerCase().includes(search.toLowerCase()))
        return true;
      if (log.userId.username.toLowerCase().includes(search.toLowerCase())) return true;
      if (log.event.name.toLowerCase().includes(search.toLowerCase())) return true;
      if (log.event.id.toString().includes(search)) return true;
      return false;
    });
    return logsFiltered;
  } catch (error) {}
}
