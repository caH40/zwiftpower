import { Request, Response } from 'express';

import { getRidersInEventsService } from '../statistics/ridersInEvents.js';
import { errorHandler } from '../errors/error.js';

export const getRidersInEvents = async (req: Request, res: Response) => {
  try {
    const { period } = req.params;
    if (isNaN(+period)) {
      throw new Error(`Нет данных о запрашиваемом периоде: ${period}`);
    }

    const ridersInEvents = await getRidersInEventsService({ period: +period });
    res.status(200).json({ ridersInEvents });
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json('Непредвиденная ошибка в getRidersInEvents');
    }
  }
};
