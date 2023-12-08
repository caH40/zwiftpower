import { LogsAdmin } from '../Model/LogsAdmin.js';
import { errorHandler } from '../errors/error.js';

// types
import { LoggingAdminArg } from '../types/types.interface.js';

export async function loggingAdmin({
  eventId,
  eventName,
  eventStart,
  userId,
  description,
}: LoggingAdminArg) {
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
    errorHandler(error);
  }
}
