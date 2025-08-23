import {
  TPaymentNotification,
  TPurchaseMetadata,
  TYooKassaPaymentEvent,
  TYooKassaPaymentNotification,
} from '../types/payment.types.js';
import { PaymentNotificationModel } from './PaymentNotification.js';

import { handleAndLogError } from '../errors/error.js';
import { SiteServiceService } from './SiteServiceService.js';

/**
 * Сервис работы c эквайрингом.
 */
export class YooKassaNotification {
  constructor() {}

  /**
   * Обработка уведомления от ЮKassa.
   */
  public async handleNotifications(notification: TYooKassaPaymentNotification): Promise<void> {
    console.log(notification);

    return;

    try {
      switch (notification.event) {
        case 'payment.succeeded': {
          await this.paymentSucceeded(notification);
          break;
        }

        case 'payment.canceled': {
          await this.paymentCanceled(notification);
          break;
        }

        case 'payment.waiting_for_capture': {
          await this.paymentWaitingForCapture(notification);
          break;
        }

        default:
          throw new Error(
            `Нет соответствующего обработчика для уведомления события: ${notification.event}`
          );
      }
    } catch (error) {
      handleAndLogError(error);
    }
  }

  private async paymentSucceeded({
    object: notification,
    event,
  }: TYooKassaPaymentNotification): Promise<void> {
    // Проверка существования данных об платеже в БД.
    await this.ensurePaymentNotificationNotExistsByIdAndEvent(notification.id, event);

    const metadata: TPurchaseMetadata = {
      entityName: notification.metadata.entityName,
      quantity: Number(notification.metadata.quantity),
    };

    // Обработка удачной покупки, зачисление слотов пользователю.
    const siteServiceSlotService = new SiteServiceService();
    await siteServiceSlotService.manageServiceSlots({
      user: notification.metadata.userId,
      metadata,
      actionSlot: 'purchase',
    });

    const query: Omit<TPaymentNotification, '_id' | 'user'> & { user: string } = {
      user: notification.metadata.userId,
      event,
      description: notification.description,
      id: notification.id,
      status: notification.status,
      amount: {
        value: Number(notification.amount.value),
        currency: notification.amount.currency,
      },
      income_amount: {
        value: Number(notification.income_amount.value),
        currency: notification.income_amount.currency,
      },
      capturedAt: notification.captured_at ? new Date(notification.captured_at) : undefined,
      createdAt: new Date(notification.created_at), //Создан платёж.
      metadata,
    };

    await PaymentNotificationModel.create(query);
  }

  private async paymentCanceled({
    object: notification,
    event,
  }: TYooKassaPaymentNotification): Promise<void> {
    // Проверка существования данных об платеже в БД.
    await this.ensurePaymentNotificationNotExistsByIdAndEvent(notification.id, event);

    const metadata: TPurchaseMetadata = {
      entityName: notification.metadata.entityName,
      quantity: Number(notification.metadata.quantity),
    };

    const query: Omit<TPaymentNotification, '_id' | 'user'> & { user: string } = {
      user: notification.metadata.userId,
      event,
      description: notification.description,
      id: notification.id,
      status: notification.status,
      amount: {
        value: Number(notification.amount.value),
        currency: notification.amount.currency,
      },
      createdAt: new Date(notification.created_at), //Создан платёж.
      cancellation_details: notification.cancellation_details,
      metadata,
    };

    await PaymentNotificationModel.create(query);
  }

  private async paymentWaitingForCapture({
    object: notification,
    event,
  }: TYooKassaPaymentNotification): Promise<void> {
    // Проверка существования данных об платеже в БД.
    await this.ensurePaymentNotificationNotExistsByIdAndEvent(notification.id, event);

    const metadata: TPurchaseMetadata = {
      entityName: notification.metadata.entityName,
      quantity: Number(notification.metadata.quantity),
    };

    const query: Omit<TPaymentNotification, '_id' | 'user'> & { user: string } = {
      user: notification.metadata.userId,
      event,
      description: notification.description,
      id: notification.id,
      status: notification.status,
      amount: {
        value: Number(notification.amount.value),
        currency: notification.amount.currency,
      },
      createdAt: new Date(notification.created_at),
      expiresAt: notification.expires_at ? new Date(notification.expires_at) : undefined,
      cancellation_details: notification.cancellation_details,
      metadata,
    };

    await PaymentNotificationModel.create(query);
  }

  /**
   * Проверка, существует ли уведомление с таким id и event.
   */
  private async ensurePaymentNotificationNotExistsByIdAndEvent(
    id: string,
    event: TYooKassaPaymentEvent
  ): Promise<void> {
    const exists = await PaymentNotificationModel.findOne({ id, event }).lean();

    if (exists) {
      throw new Error(`Уведомление уже существует: ${JSON.stringify({ id, event })}`);
    }
  }
}
