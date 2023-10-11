import { Request, Response } from 'express';

import {
  getUserResultsService,
  getUserPowerService,
} from '../service/race/rider/rider-profile.js';
import { errorHandler } from '../errors/error.js';
import { getZwiftProfilesService } from '../service/race/rider/rider-zprofiles.js';

/**
 * Контролер получения профайла райдера (анкеты), основных значений CriticalPower,
 * всех результатов райдера
 */
export async function getUserResults(req: Request, res: Response) {
  try {
    const { zwiftId } = req.params;
    const userResults = await getUserResultsService(zwiftId);
    res.status(200).json(userResults);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}

/**
 * Контролер получения значений кривой CriticalPower за 90 дней
 * для райдера (zwiftId) и CriticalPower со всех Заездов
 */
export async function getUserPower(req: Request, res: Response) {
  try {
    const { zwiftId } = req.params;
    const userPower = await getUserPowerService(zwiftId);
    res.status(200).json(userPower);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}

/**
 * Данные основного и дополнительных райдеров с сервера ZwiftAPI
 */
export async function getZwiftProfiles(req: Request, res: Response) {
  try {
    const { zwiftId } = req.params;
    const userPower = await getZwiftProfilesService(zwiftId);
    res.status(200).json(userPower);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}
