import { LogsAdmin } from '../Model/LogsAdmin.js';

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
export async function getLogsAdminsService({ page = 1, docsOnPage = 20 }) {
  try {
    const logsDB = await LogsAdmin.find()
      .sort({ date: -1 })
      .populate({ path: 'userId', select: 'username' });

    const quantityPages = Math.ceil(logsDB.length / docsOnPage);

    const sliceStart = page * docsOnPage - docsOnPage;
    const sliceEnd = docsOnPage * page;
    const logsFiltered = logsDB.slice(sliceStart, sliceEnd);

    return {
      logs: logsFiltered,
      quantityPages,
      page,
      message: 'Логи о действиях админов (модераторов)',
    };
  } catch (error) {
    throw error;
  }
}
