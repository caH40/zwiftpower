import { Request, Response } from 'express';

import { handleAndLogError } from '../errors/error.js';
import { getRidersInEventsService } from '../statistics/ridersInEvents.js';
import { getLeadersInIntervalsService } from '../statistics/leadersInIntervals/leadersInIntervals.js';
import { getRidersTotalService } from '../statistics/ridersTotal.js';
import { getRidersTotalAgeService } from '../statistics/ridersAge.js';
import { setCache } from '../cache/cache.js';
import { secondsInHour } from '../assets/date.js';
import { getRidersTotalRacingScoreService } from '../statistics/ridersTotalRacingScore.js';
import { TeamLeaderboard } from '../service/TeamLeaderboard.js';

// types
import {
  AgeCategories,
  TotalRidersFTP,
  TRidersRacingScores,
} from '../types/types.interface.js';

export const getRidersInEvents = async (req: Request, res: Response) => {
  try {
    const { path } = req;
    const { period } = req.params;
    if (isNaN(+period)) {
      throw new Error(`Нет данных о запрашиваемом периоде: ${period}`);
    }

    const ridersInEvents = await getRidersInEventsService(+period);

    // кэширование данных
    setCache(path, JSON.stringify(ridersInEvents), secondsInHour);

    res.status(200).json(ridersInEvents);
  } catch (error) {
    handleAndLogError(error);
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
    const { path } = req;
    const { male } = req.params;
    const isMale = male === 'female' ? false : true;

    const leadersInIntervals = await getLeadersInIntervalsService(isMale);

    // кэширование данных
    setCache(path, JSON.stringify(leadersInIntervals), secondsInHour);

    res.status(200).json(leadersInIntervals);
  } catch (error) {
    handleAndLogError(error);
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
    const { path } = req;
    const ridersTotal: TotalRidersFTP[] = await getRidersTotalService();

    // кэширование данных
    setCache(path, JSON.stringify(ridersTotal), secondsInHour);

    res.status(200).json(ridersTotal);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json('Непредвиденная ошибка в getRidersTotal');
    }
  }
};

/**
 * Получение всех райдеров с распределением по 10 racing score за последние 90 дней
 */
export const getRidersTotalRacingScore = async (req: Request, res: Response) => {
  try {
    const { path } = req;
    const ridersTotalRacingScore: TRidersRacingScores =
      await getRidersTotalRacingScoreService();

    // кэширование данных
    setCache(path, JSON.stringify(ridersTotalRacingScore), secondsInHour);

    res.status(200).json(ridersTotalRacingScore);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json('Непредвиденная ошибка в getRidersTotalRacingScore');
    }
  }
};
/**
 * Получение данных по количеству райдеров в возрастных категориях
 */
export const getRidersTotalAge = async (req: Request, res: Response) => {
  try {
    const { path } = req;
    const ridersTotalAge: AgeCategories[] = await getRidersTotalAgeService();

    // кэширование данных
    setCache(path, JSON.stringify(ridersTotalAge), secondsInHour);

    res.status(200).json(ridersTotalAge);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json('Непредвиденная ошибка в ridersTotalAge');
    }
  }
};

/**
 * Получение таблиц лидеров команд.
 */
export const getTeams = async (req: Request, res: Response) => {
  try {
    const seasonLabel = req.params.seasonLabel;

    const teamLeaderboard = new TeamLeaderboard();

    const response = await teamLeaderboard.get(seasonLabel);

    res.status(200).json(response);
  } catch (error) {
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json('Непредвиденная ошибка в getTeams');
    }
  }
};
