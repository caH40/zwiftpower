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
import { getUnitData } from '../utils/pricing.js';

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

  private buildPaymentPayload({
    service,
    customer,
    userId,
    planId,
    returnUrl,
  }: {
    service: TSiteServicePrice;
    customer: { full_name: string };
    userId: string;
    planId: string;
    returnUrl: string;
  }): TCreatePaymentWithMeta {
    const plan = service.plans.find(({ id }) => id === planId);

    if (!plan) {
      throw new Error(`Не найден тарифный план с id:${planId}`);
    }

    const description = `${service.description} ${plan.item.quantity} ${getUnitData(
      plan.item.unit
    )}`;

    const {
      id,
      amount,
      item: { quantity, unit },
    } = plan;

    const currentAmount = {
      value: String(amount.value),
      currency: amount.currency,
    };

    const receipt: IReceipt = {
      customer,
      items: [
        {
          description,
          amount: currentAmount,
          quantity: String(quantity),
          vat_code: 1,
        },
      ],
    };

    // Использование
    const confirmation: IConfirmation = {
      type: 'redirect',
      return_url: returnUrl,
    };

    return {
      id,
      amount: currentAmount,
      receipt,
      capture: true,
      confirmation,
      metadata: { userId, unit, quantity, entityName: service.entityName },
      description,
    };
  }

  private buildOrganizerService(service: TSiteServicePrice): TSiteServiceForClient[] {
    return service.plans.map(({ item, amount, id }) => ({
      id,
      label: `Доступ к сервису Организатор (${item.quantity} ${getUnitData(item.unit)})`,
      entityName: service.entityName,
      description: service.description,
      origin: 'purchased',
      startDate: new Date().toISOString(),
      // FIXME: жестко установлено, что item.unit месяц и следовательно берется millisecondsIn31Days.
      endDate: new Date(Date.now() + millisecondsIn31Days * item.quantity).toISOString(),
      amount: amount,
    }));
  }

  /**
   * Получение данных для совершения платежа на сервисе YooKassa для сервиса Организатор.
   */
  public async getOrganizerPaymentPayload({
    userId,
    returnUrl,
    planId,
  }: {
    userId: string;
    returnUrl?: string;
    planId: string;
  }): Promise<TCreatePaymentWithMeta> {
    const customer = await this.getCustomer(userId);
    const service = await this.getService('organizer');

    service.description = 'Подписка на сервис Организатор сроком на';

    return this.buildPaymentPayload({
      service,
      planId,
      customer,
      userId,
      returnUrl: returnUrl ?? 'https://zwiftpower.ru',
    });
  }

  /**
   * Получение данных по ценам сервиса Организатор для карточки оплаты.
   */
  public async getOrganizerServiceCard(): Promise<TSiteServiceForClient[]> {
    const service = await this.getService('organizer');

    return this.buildOrganizerService(service);
  }
}
