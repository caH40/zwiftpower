import { Request, Response } from 'express';

import { errorHandler } from '../errors/error.js';
import { getRidersInEventsService } from '../statistics/ridersInEvents.js';
import { getLeadersInIntervalsService } from '../statistics/leadersInIntervals/leadersInIntervals.js';
import { getRidersTotalService } from '../statistics/ridersTotal.js';

// types
import { TotalRidersFTP } from '../types/types.interface.js';

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

/**
 * Получение лучших результатов райдеров на интервалах в Эвентах за 90 дней
 */
export const getLeadersInIntervals = async (req: Request, res: Response) => {
  try {
    const { male } = req.params;
    const isMale = male === 'female' ? false : true;

    const leadersInIntervals = await getLeadersInIntervalsService(isMale);
    res.status(200).json(leadersInIntervals);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json('Непредвиденная ошибка в getLeadersInIntervals');
    }
  }
};

/**
 * Получение всех райдеров с распределением по 0.1 вт/кг за последние 90 дней
 */
export const getRidersTotal = async (req: Request, res: Response) => {
  try {
    const ridersTotal: TotalRidersFTP[] = await getRidersTotalService();
    res.status(200).json(ridersTotal);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json('Непредвиденная ошибка в getRidersTotal');
    }
  }
};
