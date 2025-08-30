import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import { MongooseUtils } from '../utils/MongooseUtils.js';
import { SiteServicesService } from '../service/SiteServicesService.js';

/**
 * Контроллер получения всех доступных платных сервисов на сайте для покупки.
 */
export async function getSiteServicesController(req: Request, res: Response) {
  try {
    const mongooseUtils = new MongooseUtils();

    // Проверка параметров из тела запроса.
    const userId = req.params.userId;

    if (!userId || typeof userId !== 'string' || !mongooseUtils.checkValidObjectId(userId)) {
      throw new Error('Не получен userId');
    }

    const siteServiceService = new SiteServicesService();

    const response = await siteServiceService.getAllPurchasable(userId);

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    handleErrorInController(res, error);
  }
}

/**
 * Контроллер возвращает все активные и истекшие слоты на сервисы сайта у пользователя.
 */
export async function getAllSiteServicesController(req: Request, res: Response) {
  try {
    const mongooseUtils = new MongooseUtils();

    // Проверка параметров из тела запроса.
    const userId = req.params.userId;

    if (!userId || typeof userId !== 'string' || !mongooseUtils.checkValidObjectId(userId)) {
      throw new Error('Не получен userId');
    }

    const siteServiceService = new SiteServicesService();

    const response = await siteServiceService.getAll(userId);

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    handleErrorInController(res, error);
  }
}
