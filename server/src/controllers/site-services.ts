import { Request, Response } from 'express';

import { getSiteServicesService } from '../service/site_service/site-service.js';
import { handleErrorInController } from '../errors/error.js';
import { MongooseUtils } from '../utils/MongooseUtils.js';

/**
 * Контроллер получения всех платных сервисов на сайте.
 */
export async function getSiteServicesController(req: Request, res: Response) {
  try {
    const mongooseUtils = new MongooseUtils();
    // Проверка параметров из тела запроса.
    const userId = req.body.userId;

    if (!userId || typeof userId !== 'string' || !mongooseUtils.checkValidObjectId(userId)) {
      throw new Error('Не получен userId');
    }

    const response = await getSiteServicesService(userId);

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    handleErrorInController(res, error);
  }
}
