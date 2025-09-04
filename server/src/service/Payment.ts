import { YooCheckout, IConfirmation, IReceipt } from '@a2seven/yoo-checkout';
import { v4 as uuidv4 } from 'uuid';

import { getYooKassaConfig } from '../config/environment.js';
import { SiteServicePriceModel } from '../Model/SiteServicePrice.js';
import { TSiteServicePrice } from '../types/model.interface.js';
import { TSiteServiceForClient } from '../types/site-service.type.js';
import { User } from '../Model/User.js';
import { millisecondsIn31Days } from '../assets/date.js';

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
  }): Promise<{ paymentResponse: IConfirmation; message: string }> {
    const idempotenceKey = uuidv4(); // Новый ключ для каждого вызова.

    const payment = await this.checkout.createPayment(createPayload, idempotenceKey);

    return { paymentResponse: payment.confirmation, message: 'Запрос на оплату' };
  }

  private async getCustomer(userId: string): Promise<{ full_name: string }> {
    const userDB = await User.findById(userId, { _id: false, username: true }).lean<{
      username: string;
    }>();
    return { full_name: userDB?.username || `Пользователь с id: ${userId}` };
  }

  private async getService(entityName: string): Promise<TSiteServicePrice> {
    const service = await SiteServicePriceModel.findOne({
      entityName,
    }).lean<TSiteServicePrice>();
    if (!service) {
      throw new Error(`Не найден сервис "${entityName}" в прайс-листе`);
    }
    return service;
  }

  private buildPaymentPayload(
    service: TSiteServicePrice,
    customer: { full_name: string },
    userId: string,
    returnUrl: string
  ): TCreatePaymentWithMeta {
    const {
      description,
      item: { quantity, unit },
    } = service;

    const amount = {
      value: String(service.amount.value),
      currency: service.amount.currency,
    };

    const receipt: IReceipt = {
      customer,
      items: [
        {
          description,
          amount,
          quantity: String(quantity),
          vat_code: 1,
        },
      ],
    };

    return {
      amount,
      receipt,
      capture: true,
      confirmation: { type: 'redirect', return_url: returnUrl },
      metadata: { userId, unit, quantity, entityName: service.entityName },
      description,
    };
  }

  private buildOrganizerService(service: TSiteServicePrice): TSiteServiceForClient {
    return {
      id: 0,
      label: 'Доступ к сервису Организатор',
      entityName: service.entityName,
      description: service.description,
      origin: 'purchased',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + millisecondsIn31Days).toISOString(),
      amount: service.amount,
    };
  }

  /**
   * Получение данных для совершения платежа на сервисе YooKassa для сервиса Организатор.
   */
  public async getOrganizerPaymentPayload(
    userId: string,
    returnUrl?: string
  ): Promise<TCreatePaymentWithMeta> {
    const customer = await this.getCustomer(userId);
    const service = await this.getService('organizer');
    return this.buildPaymentPayload(
      service,
      customer,
      userId,
      returnUrl ?? 'https://zwiftpower.ru'
    );
  }

  public async getOrganizerServiceCard(): Promise<TSiteServiceForClient> {
    const service = await this.getService('organizer');
    return this.buildOrganizerService(service);
  }
}
