/**
 * Сервис с учетом доступных слотов и истории их использования.
 */
export type TSiteService = {
  entityName: TEntityNameForSlot; // Название должно быть уникальным в массиве services сущности TPaidSiteServiceAccess
  slots: TSubscriptionSlot[]; // История использования слотов пользователем.
};

/**
 * Название сервиса.
 */
export type TEntityNameForSlot = 'organizer';

/**
 * Состояние слота.
 * active' | 'expired' вычисляется на лету.
 */
export type TSubscriptionSlot = {
  description: string; // Название (Оплата подписки на месяц. и т.д)
  isPaused: boolean; // true → подписка на паузе
  origin: TSlotOrigin;
  startDate: Date;
  endDate: Date;
};

/**
 * Способ получения подписки (слота).
 *
 * - 'trial'     → предоставлен как пробный период
 * - 'purchased' → приобретён пользователем за деньги
 * - 'gift'      → подарен сервисом (например, акция или бонус)
 * - 'promo'     → активирован через промокод
 * - 'admin'     → вручную выдан администратором
 */
export type TSlotOrigin = 'trial' | 'purchased' | 'gift' | 'promo' | 'admin';

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
