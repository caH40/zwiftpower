import { Request, Response } from 'express';

import { getLogsErrorsService } from '../service/logs_service/errors.js';
import { errorHandler } from '../errors/error.js';

// types
import { GetLogsAdmins } from '../types/http.interface.js';
import { LogsErrorFetch } from '../common/types/logs.interface.js';

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
