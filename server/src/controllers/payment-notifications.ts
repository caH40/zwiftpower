import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import { YooKassaNotification } from '../service/YooKassaNotification.js';
import { MongooseUtils } from '../utils/MongooseUtils.js';

/**
 * Контроллер получения всех платных сервисов на сайте.
 */
export async function postYooKassaNotificationsController(req: Request, res: Response) {
  try {
    const body = req.body;
    if (!body) {
      throw new Error('Не получены данные оплаты с сервиса YooKassa!');
    }

    const paymentService = new YooKassaNotification();
    const response = await paymentService.handleNotifications(body);

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    handleErrorInController(res, error);
  }
}

/**
 * Контроллер получения всех платных сервисов на сайте.
 */
export async function getAllYooKassaNotificationsByUserIdController(
  req: Request,
  res: Response
) {
  try {
    const userId = req.query.userId;

    const mongooseUtils = new MongooseUtils();
    if (!userId || typeof userId !== 'string' || !mongooseUtils.checkValidObjectId(userId)) {
      throw new Error('Не получен userId');
    }

    const { id: userIdFromAuth, role } = req.user || {};

    if (!userIdFromAuth || !role) {
      throw new Error('Не получены данные авторизации!');
    }

    if (userId !== userIdFromAuth && role !== 'admin') {
      throw new Error('Нет доступа');
    }

    const paymentService = new YooKassaNotification();
    const response = await paymentService.getAllByUserId(userId);

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    handleErrorInController(res, error);
  }
}
