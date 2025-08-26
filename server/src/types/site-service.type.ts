import { ENTITY_NAME_SLOTS, SLOT_ORIGIN } from '../assets/constants';

/**
 * Сервис с учетом доступных слотов и истории их использования.
 */
export type TSiteService = {
  entityName: TEntityNameForSlot; // Название должно быть уникальным в массиве services сущности TPaidSiteServiceAccess
  periodSlots: TSubscriptionPeriodSlot[];
  pieceSlots: TSubscriptionPieceSlot[];
};

/**
 * Название сервиса.
 */
export type TEntityNameForSlot = (typeof ENTITY_NAME_SLOTS)[number];

/**
 * Состояние слота.
 * active' | 'expired' вычисляется на лету.
 */
export type TSubscriptionPeriodSlot = {
  description: string; // Название (Оплата подписки на месяц. и т.д)
  isPaused: boolean; // true → подписка на паузе
  origin: TSlotOrigin;
  startDate: Date;
  endDate: Date;
};
export type TSubscriptionPieceSlot = {
  description: string;
  origin: TSlotOrigin;
  quantity: number;
};

// Способ получения подписки (слота).
export type TSlotOrigin = (typeof SLOT_ORIGIN)[number];

export type TSiteServiceForClient = {
  entityName: TEntityNameForSlot;
  description: string; // Подробное описание сервиса.
  label: string; // Название для отображения опции в select.
  subscriptionDescription: string; // Название (Оплата подписки на месяц. и т.д)
  origin: TSlotOrigin;
  startDate: string;
  endDate: string;
  price: {
    unitPrice: number;
    currency: 'RUB';
  };
};
