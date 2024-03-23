import { Request, Response } from 'express';

import {
  getUserResultsService,
  getUserPowerService,
} from '../service/race/rider/rider-profile.js';
import { errorHandler } from '../errors/error.js';
import { getZwiftProfilesService } from '../service/race/rider/rider-zprofiles.js';
import { refreshProfileService } from '../service/profile/zwiftid/update-zwiftdata.js';
import { updateZwiftIdService } from '../service/profile/zwiftid/update-zwiftid.js';
import { deleteUserZwiftIdService } from '../service/profile/zwiftid/delete-additional.js';

// types
import { GetProfileResultsQuery } from '../types/http.interface.js';

/**
 * Контролер получения профайла райдера (анкеты), основных значений CriticalPower,
 * всех результатов райдера
 */
export async function getUserResults(req: Request, res: Response) {
  try {
    const { page, docsOnPage, zwiftId } = req.query;
    const query: GetProfileResultsQuery = {
      page: page ? +page : undefined,
      docsOnPage: docsOnPage ? +docsOnPage : undefined,
      zwiftId: zwiftId ? +zwiftId : undefined,
    };

    const userResults = await getUserResultsService(query);
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

    const zwiftProfiles = await getZwiftProfilesService(+zwiftId);
    res.status(200).json(zwiftProfiles);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}

/**
 * Обновление zwiftId у пользователя
 */
export async function putUserZwiftId(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const zwiftId: number = req.body.zwiftId;
    const isAdditional: boolean = req.body.isAdditional;
    const user = await updateZwiftIdService(userId, zwiftId, isAdditional);

    return res.status(200).json(user);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
}

/**
 * Удаление дополнительного zwiftId у пользователя
 */
export async function deleteUserZwiftId(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const zwiftId: number = +req.body.zwiftId;
    const user = await deleteUserZwiftIdService(userId, zwiftId);

    return res.status(200).json(user);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
}
/**
 * Обновление данных пользователя на сайте zwiftpower.ru с данных zwiftAPI
 */
export async function refreshProfile(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const user = await refreshProfileService(userId);

    return res.status(200).json(user);
  } catch (error) {
    errorHandler(error);
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
}
