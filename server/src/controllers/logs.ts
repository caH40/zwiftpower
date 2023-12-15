import { Request, Response } from 'express';

import {
  deleteLogErrorService,
  getLogErrorService,
  getLogsErrorsService,
} from '../service/logs_service/errors.js';
import { errorHandler } from '../errors/error.js';

// types
import { GetLogsAdmins } from '../types/http.interface.js';
import { LogsErrorFetch } from '../common/types/logs.interface.js';
import { LogsErrorSchema } from '../types/model.interface.js';
import { deleteLogAdminService } from '../service/logs_service/admins.js';

/**
 * Запрос логов ошибок на сервере
 */
export async function getLogsErrors(req: Request, res: Response) {
  try {
    const query: GetLogsAdmins = req.query;

    const logs: LogsErrorFetch = await getLogsErrorsService(query);

    return res.status(200).json(logs);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
}
/**
 * Запрос лога конкретной ошибки на сервере
 */
export async function getLogError(req: Request, res: Response) {
  try {
    const { id } = req.query;

    if (typeof id !== 'string') {
      throw new Error('Необходим id запрашиваемой ошибки');
    }

    const logError: LogsErrorSchema | null = await getLogErrorService(id);

    return res.status(200).json(logError);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
}
/**
 * Удаление логов ошибок
 */
export async function deleteLogError(req: Request, res: Response) {
  try {
    const ids = req.body;
    const response = await deleteLogErrorService(ids);
    return res.status(200).json(response);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
}
/**
 * Удаление логов админов
 */
export async function deleteLogAdmin(req: Request, res: Response) {
  try {
    const ids = req.body;
    const response = await deleteLogAdminService(ids);
    return res.status(200).json(response);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
}
