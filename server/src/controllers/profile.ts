import { Request, Response } from 'express';

import {
  getUserPowerService,
  getUserProfileService,
} from '../service/race/rider/rider-profile.js';
import { handleAndLogError, handleErrorInController } from '../errors/error.js';
import { getZwiftProfilesService } from '../service/race/rider/rider-zprofiles.js';
import { updateZwiftIdService } from '../service/profile/zwiftid/update-zwiftid.js';
import { deleteUserZwiftIdService } from '../service/profile/zwiftid/delete-additional.js';
import { getUserResultsService } from '../service/race/rider/results.js';
import { getMetricService } from '../service/metrics/getMetric.js';
import {
  getNotificationsService,
  putNotificationsService,
} from '../service/profile/notifications.js';
import { TNotifications, TUserStreams } from '../types/model.interface.js';
import { putUserStreamsService } from '../service/profile/streams.js';
import { getUserSettingsService } from '../service/profile/settings.js';
import { putUsernameService, updateProfileService } from '../service/profile/rider.js';

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
    handleAndLogError(error);
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
    handleAndLogError(error);
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
    handleAndLogError(error);
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
    handleAndLogError(error);
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
    handleAndLogError(error);
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
    const response = await updateZwiftIdService(userId, zwiftId, isAdditional);

    return res.status(200).json(response);
  } catch (error) {
    handleAndLogError(error);
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
    handleAndLogError(error);
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
}
/**
 * Обновление данных пользователя на сайте zwiftpower.ru в коллекции Rider с данных zwiftAPI
 */
export async function refreshProfile(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const user = await updateProfileService(userId);

    return res.status(200).json(user);
  } catch (error) {
    handleAndLogError(error);
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
    handleAndLogError(error);
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}

/**
 * Контроллер получение данных настроек профиля пользователя.
 */
export async function getUserSettings(req: Request, res: Response) {
  try {
    const { zwiftId } = req.params;

    if (isNaN(+zwiftId)) {
      throw new Error(`Полученный zwiftId: ${zwiftId} некорректный`);
    }

    const response = await getUserSettingsService({ zwiftId: +zwiftId });

    return res.status(200).json(response);
  } catch (error) {
    handleAndLogError(error);
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}

/**
 * Контроллер изменения username пользователя.
 */
export async function putUsername(req: Request, res: Response) {
  try {
    const { username } = req.body;
    const { userId } = req.params;

    if (!username) {
      return res.status(400).json({ message: 'Не получен username' });
    }

    const response = await putUsernameService({ userId, username });

    return res.status(200).json(response);
  } catch (error) {
    handleErrorInController(res, error);
  }
}

/**
 * Проверяет, что объект соответствует типу TNotifications.
 * @param notifications - Объект для проверки.
 * @returns {boolean} - Возвращает true, если объект соответствует типу TNotifications.
 */
export function isValidNotifications(notifications: unknown): notifications is TNotifications {
  return (
    typeof notifications === 'object' &&
    notifications !== null &&
    typeof (notifications as TNotifications).development === 'boolean' &&
    typeof (notifications as TNotifications).events === 'boolean' &&
    typeof (notifications as TNotifications).news === 'boolean'
  );
}

/**
 * Контроллер обновления данных настроек оповещения пользователя по почте.
 */
export async function putNotifications(req: Request, res: Response) {
  try {
    const { zwiftId, notifications } = req.body;
    const { userZwiftId } = req.params;

    if (zwiftId !== userZwiftId) {
      throw new Error('Можно изменять данные только своего профиля!');
    }

    if (isNaN(+zwiftId)) {
      throw new Error(`Полученный zwiftId: ${zwiftId} некорректный`);
    }

    if (!isValidNotifications(notifications)) {
      throw new Error(`Некорректные данные notifications`);
    }

    const response = await putNotificationsService({ zwiftId: +zwiftId, notifications });

    return res.status(200).json(response);
  } catch (error) {
    handleAndLogError(error);
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}

/**
 * Контроллер обновления настроек для отображения трансляций с разных ресурсов.
 */
export async function putUserStreams(req: Request, res: Response) {
  try {
    const { zwiftId, streams } = req.body;
    const { userZwiftId } = req.params;

    if (zwiftId !== userZwiftId) {
      throw new Error('Можно изменять данные только своего профиля!');
    }

    if (isNaN(+zwiftId)) {
      throw new Error(`Полученный zwiftId: ${zwiftId} некорректный`);
    }

    // Изменение название свойств объекта с общих на корректные.
    const streamsCorrectProperties: TUserStreams = {
      ...(streams?.twitch && { twitch: streams.twitch }),
      ...(streams?.youtube && {
        youtube: {
          channelHandle: streams.youtube.channelName,
          isEnabled: streams.youtube.isEnabled,
        },
      }),
    };

    const response = await putUserStreamsService({
      zwiftId: +zwiftId,
      streamsParams: streamsCorrectProperties,
    });

    return res.status(200).json(response);
  } catch (error) {
    handleAndLogError(error);
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return res.status(400).json({ message });
  }
}
