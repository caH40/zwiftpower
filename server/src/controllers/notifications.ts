import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import { YooKassaNotification } from '../service/YooKassaNotification.js';

/**
 * Контроллер получения всех платных сервисов на сайте.
 */
export async function postYooKassaNotificationsController(req: Request, res: Response) {
  try {
    console.log('This is controller!');

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
