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
