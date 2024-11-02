import { Request, Response } from 'express';

import {
  getUserPowerService,
  getUserProfileService,
} from '../service/race/rider/rider-profile.js';
import { errorHandler } from '../errors/error.js';
import { getZwiftProfilesService } from '../service/race/rider/rider-zprofiles.js';
import { refreshProfileService } from '../service/profile/zwiftid/update-zwiftdata.js';
import { updateZwiftIdService } from '../service/profile/zwiftid/update-zwiftid.js';
import { deleteUserZwiftIdService } from '../service/profile/zwiftid/delete-additional.js';
import { getUserResultsService } from '../service/race/rider/results.js';
import { getMetricService } from '../service/metrics/getMetric.js';
import { getNotificationsService } from '../service/profile/zwiftid/notifications.js';

/**
 * Контролер получения всех результатов райдера
 */
export async function getUserResults(req: Request, res: Response) {
  try {
    const { page, docsOnPage, zwiftId } = req.query;

    const query = {
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
 * Контролер получения профайла райдера (анкеты), основных значений CriticalPower,
 */
export async function getUserProfile(req: Request, res: Response) {
  try {
    const { zwiftId } = req.params;

    const userResults = await getUserProfileService(+zwiftId);
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
 * Контролер получения значений Racing Score для райдера (zwiftId) за период.
 */
export async function getRiderMetric(req: Request, res: Response) {
  try {
    const { zwiftId } = req.params;

    if (!Number.isInteger(+zwiftId)) {
      throw new Error('zwiftId должен быть целым числом!');
    }

    const riderMetric = await getMetricService({ zwiftId: +zwiftId });
    res.status(200).json(riderMetric);
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

/**
 * Контроллер получение данных настроек оповещения пользователя по почте.
 */
export async function getNotifications(req: Request, res: Response) {
  try {
    const { zwiftId } = req.params;

    if (isNaN(+zwiftId)) {
      throw new Error(`Полученный zwiftId: ${zwiftId} некорректный`);
    }

    const response = await getNotificationsService({ zwiftId: +zwiftId });

    return res.status(200).json(response);
  } catch (error) {
    errorHandler(error);
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}
