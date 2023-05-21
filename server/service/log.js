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
export async function getLogsAdminsService() {
  try {
    const logsDB = await LogsAdmin.find();

    return {
      logs: logsDB,
      message: 'Логи о действиях админов (модераторов)',
    };
  } catch (error) {
    throw error;
  }
}
