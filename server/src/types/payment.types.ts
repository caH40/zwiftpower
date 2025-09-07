import { ICreatePayment } from '@a2seven/yoo-checkout';
import { TEntityNameForSlot } from './site-service.type';
import mongoose from 'mongoose';
import { CURRENCY, PURCHASE_UNITS } from '../assets/constants';

export type TCreatePaymentWithMeta = Omit<ICreatePayment, 'metadata'> & {
  id: string;
  metadata: TCreatePayloadMetadata;
};
export type TCreatePayloadMetadata = {
  userId: string;
  quantity: number;
  entityName: TEntityNameForSlot;
  unit: TPurchaseUnit;
};
export type TNotificationMetadata = Omit<TCreatePayloadMetadata, 'quantity'> & {
  quantity: string;
  unit: TPurchaseUnit;
};

// Данные о покупке для обработки и сохранения в БД.
export type TPurchaseMetadata = {
  quantity: number;
  entityName: TEntityNameForSlot;
  unit: TPurchaseUnit;
};

export type TPurchaseUnit = (typeof PURCHASE_UNITS)[number];

/**
 * Пример данных оповещения событий платежа от ЮКассы.
 */
export type TYooKassaPaymentNotification = {
  type: 'notification';
  event: TYooKassaPaymentEvent;
  object: {
    id: string;
    // https://yookassa.ru/developers/payment-acceptance/getting-started/payment-process#lifecycle
    status: TYooKassaPaymentStatus;
    amount: {
      value: string; // денежная сумма в виде строки
      currency: TCurrency;
    };
    income_amount: {
      value: string;
      currency: TCurrency;
    };
    description: string;
    recipient: {
      account_id: string;
      gateway_id: string;
    };
    payment_method: {
      type: string; // 'yoo_money' и другие
      id: string;
      saved: boolean;
      status: string;
      title: string;
      account_number: string;
    };
    captured_at?: string;
    created_at: string;
    expires_at?: string;
    test: boolean;
    refunded_amount: {
      value: string;
      currency: TCurrency;
    };
    cancellation_details?: { party: string; reason: string };
    paid: boolean;
    refundable: boolean;
    metadata: TNotificationMetadata;
  };
};
export type TCurrency = (typeof CURRENCY)[number];
export type TYooKassaPaymentEvent =
  | 'payment.succeeded'
  | 'payment.canceled'
  | 'payment.pending'
  | 'payment.waiting_for_capture';

export type TYooKassaPaymentStatus =
  | 'succeeded'
  | 'pending'
  | 'waiting_for_capture'
  | 'canceled';

// Действия над слотами для сервисов. Покупка, Использование, Отмена использования.
export type TActionSlot = 'purchase' | 'consume' | 'refund';

/**
 * Дополнительная отладочная информация, передаваемая в сервисы для логирования и диагностики ошибок.
 */
export type DebugMeta = {
  caller?: string; // Откуда вызван сервис (например, 'ProfilePage' или 'api/user/[id]').
  path?: string; // Абсолютный путь страницы или API (например, '/profile/123').
  authUserId?: number; // ID на сайте текущего авторизованного пользователя.
  rawParams?: unknown; // Оригинальные route-параметры (например, props.params).
  search?: unknown; // Query-параметры (например, props.searchParams).
};

export type TPaymentNotificationDocument = TPaymentNotification & Document;
export type TPaymentNotification = {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId; // Ссылка на User.
  event: TYooKassaPaymentEvent;
  description: string;
  id: string; // ID платежа в ЮKassa.
  status: TYooKassaPaymentStatus; // Статус платежа.
  amount: {
    value: number;
    currency: 'RUB';
  };
  income_amount?: {
    value: number; // Сумма, полученная магазином (за вычетом комиссии).
    currency: 'RUB';
  };
  metadata: {
    entityName: TEntityNameForSlot;
    quantity: number;
  };
  cancellation_details?: { party: string; reason: string };
  capturedAt?: Date; // Оплачен платёж.
  expiresAt?: Date; // Время когда истечет срок подтверждения платежа магазином.
  createdAt: Date;
};
