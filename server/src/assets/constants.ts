/**
 * Префикс для переменных, используемых в localStorage и cookies в браузере.
 */
export const prefixSite = '__zp_';
/**
 * Название переменной для токена обновления, сохраняемого в cookies.
 */
export const currentNameRefreshToken = `${prefixSite}refreshToken`;

export const optionsEventType = [
  {
    id: 0,
    name: 'GROUP_RIDE',
    nameSecond: 'EVENT_TYPE_GROUP_RIDE',
    translate: 'Свободный заезд (Ride)',
    title: 'GROUP RIDE',
  },
  {
    id: 1,
    name: 'RACE',
    nameSecond: 'EVENT_TYPE_RACE',
    translate: 'Гонка (Race)',
    title: 'RACE',
  },
  {
    id: 2,
    name: 'TIME_TRIAL',
    nameSecond: 'EVENT_TYPE_TIME_TRIAL',
    translate: 'Гонка с раздельным стартом (TT)',
    title: 'TIME TRIAL',
  },
];

/**
 * Значения параметра microserviceEventVisibility в настройках Эвента.
 */
export const eventOptionsVisibility = [
  {
    id: 0,
    name: 'DEFINED_BY_RESOURCE_ID',
    translate: 'Могут участвовать только райдеры из клуба',
  },
  { id: 1, name: 'SHAREABLE', translate: 'Могут участвовать все райдеры' },
  { id: 2, name: 'PUBLIC', translate: 'Публичный' },
];

// Размерность приобретаемого слота (подписки) сервиса.
export const PURCHASE_UNITS = ['month', 'week', 'day', 'piece'] as const;

// Названия сущностей сервисов на сайте (платные сервисы).
export const ENTITY_NAME_SLOTS = ['organizer'] as const;

/**
 * Способ получения подписки (слота).
 *
 * - 'trial'     → предоставлен как пробный период
 * - 'purchased' → приобретён пользователем за деньги
 * - 'gift'      → подарен сервисом (например, акция или бонус)
 * - 'promo'     → активирован через промокод
 * - 'admin'     → вручную выдан администратором
 */
export const SLOT_ORIGIN = ['trial', 'purchased', 'gift', 'promo', 'admin'] as const;
