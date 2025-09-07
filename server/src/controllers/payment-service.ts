import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import { PaymentService } from '../service/Payment.js';

/**
 * Контроллер создания оплаты.
 */
export async function createPaymentController(req: Request, res: Response) {
  try {
    // Проверка параметров из тела запроса.
    const createPayload = req.body.createPayload;

    if (!createPayload) {
      throw new Error('Не получен createPayload');
    }

    const paymentService = new PaymentService();

    const response = await paymentService.create({ createPayload });

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    handleErrorInController(res, error);
  }
}

/**
 * Контроллер получение данных для совершения платежа на сервисе YooKassa для сервиса Организатор.
 */
export async function getOrganizerPaymentPayloadController(req: Request, res: Response) {
  try {
    // id пользователя совершающего покупку, получаем из мидлваре роутера.
    const userId = req.user!.id;

    const returnUrl = req.query.returnUrl as string | undefined;
    const planId = req.query.planId as string;

    const paymentService = new PaymentService();

    const response = await paymentService.getOrganizerPaymentPayload({
      userId,
      returnUrl,
      planId,
    });

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    handleErrorInController(res, error);
  }
}
