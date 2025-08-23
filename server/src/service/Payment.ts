import { YooCheckout, IConfirmation } from '@a2seven/yoo-checkout';
import { v4 as uuidv4 } from 'uuid';

import { getYooKassaConfig } from '../config/environment.js';
import { handleAndLogError } from '../errors/error.js';

// types
import { TCreatePaymentWithMeta } from '../types/payment.types.js';

/**
 * Сервис работы c эквайрингом.
 */
export class PaymentService {
  private checkout: YooCheckout;

  constructor() {
    const config = getYooKassaConfig();

    this.checkout = new YooCheckout({ shopId: config.shopId, secretKey: config.secretKey });
  }

  /**
   * Создание страницы для оплаты.
   */
  public async create({
    createPayload,
  }: {
    createPayload: TCreatePaymentWithMeta;
  }): Promise<IConfirmation | null> {
    try {
      const idempotenceKey = uuidv4(); // Новый ключ для каждого вызова.

      console.log(createPayload);

      const payment = await this.checkout.createPayment(createPayload, idempotenceKey);

      return payment.confirmation;
    } catch (error) {
      handleAndLogError(error);
      return null;
    }
  }

  /**
   * История всех платежей (уведомлений) пользователя из БД сайта.
   */
  // public async getHistory({
  //   userId,
  // }: {
  //   userId: string;
  // }): Promise<ServerResponse<TPaymentNotificationDto[] | null>> {
  //   try {
  //     const paymentNotificationsDB = await PaymentNotificationModel.find({
  //       user: userId,
  //     }).lean<TPaymentNotification[]>();

  //     // Сортировка времени создания платежа, сначала более свежие.
  //     // Если это удачный платеж, то берется дата оплаты, а не дата создания операции.
  //     paymentNotificationsDB.sort((a, b) => {
  //       const currentTime = (item: TPaymentNotification) =>
  //         item.event === 'payment.succeeded' && item.capturedAt
  //           ? item.capturedAt.getTime()
  //           : item.createdAt.getTime();

  //       return currentTime(b) - currentTime(a);
  //     });

  //     const afterDto = paymentNotificationsDB.map((n) => getPaymentNotificationDto(n));

  //     return { data: afterDto, ok: true, message: 'История операций по платежам.' };
  //   } catch (error) {
  //     this.errorLogger(error);
  //     return this.handlerErrorDB(error);
  //   }
  // }
}
