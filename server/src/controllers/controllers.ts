import { Request, Response } from 'express';

import { getSeriesActualService } from '../service/series.js';
import { getLogsAdminsService } from '../service/log.js';
import { updateZwiftIdService } from '../service/user.js';
import { errorHandler } from '../errors/error.js';

// types
import { GetLogsAdmins } from '../types/http.interface.js';
import { LogsFetch } from '../common/types/logs.interface.js';

export async function getSeriesActual(req: Request, res: Response) {
  try {
    const series = await getSeriesActualService();
    return res.status(200).json(series);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
}
//
// запрос логов по действиям админов(модераторов)
export async function getLogsAdmins(req: Request, res: Response) {
  try {
    const query: GetLogsAdmins = req.query;

    const logs: LogsFetch = await getLogsAdminsService(query);

    return res.status(200).json(logs);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
}
//
// обновление zwiftId у пользователя
export async function putUserZwiftId(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const zwiftId: string = req.body.zwiftId;
    const user = await updateZwiftIdService(userId, zwiftId);

    return res.status(200).json(user);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
}
