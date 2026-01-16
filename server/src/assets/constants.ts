import { millisecondsIn10Minutes } from './date.js';

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
export const purchaseUnits = new Map([
  ['month', { label: 'месяц', symbol: 'мес.', full: 'за месяц' }],
  ['week', { label: 'неделя', symbol: 'нед.', full: 'за неделю' }],
  ['day', { label: 'день', symbol: 'дн.', full: 'за день' }],
  ['piece', { label: 'штука', symbol: 'шт.', full: 'за штуку' }],
]);

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

export const DAYS_IN_MONTH_FOR_SLOT = 31;

export const CURRENCY = ['RUB'] as const;
export const currency = new Map([
  [
    'RUB',
    {
      shortName: 'руб',
      symbol: '₽',
    },
  ],
]);

/**
 * Специализация райдера.
 * - Climber: силен в горах, высокий W/kg на подъемах.
 * - Sprinter: сильный на коротких разгонах, финишный спринтер.
 * - Time Trialist: силен в индивидуальной гонке, поддерживает ровный темп.
 * - All-Rounder: универсал, стабилен на всех типах трасс.
 * - Puncheur: «взрывной» райдер, хорошо идет на коротких крутых подъемах.
 */
export const TEAM_SPECIALIZATIONS = [
  'Climber',
  'Sprinter',
  'Time Trialist',
  'All-Rounder',
  'Puncheur',
] as const;

/**
 * Роль райдера в команде.
 * - Founder: создатель команды, владелец.
 * - Captain: лидер команды, основной стратег на гонках.
 * - Vice-Captain: сокопитан, помогает капитану в принятии решений.
 * - Domestique: помощник команды, работает на лидеров.
 * - Sprinter: специализация на спринтах (может совмещаться с ролью).
 * - Climber: специализация на горах (может совмещаться с ролью).
 * - All-Rounder: универсал, может закрывать разные роли.
 */
export const TEAM_ROLES = [
  'Founder',
  'Captain',
  'Vice-Captain',
  'Domestique',
  'Sprinter',
  'Climber',
  'All-Rounder',
] as const;

// Тип для ключей групп
// export type GroupLabel = 1 | 2 | 3 | 4;

// Соответствие: номер группы -> целевая удельная мощность (Вт/кг)
export const groupTargetWattsPerKg: Record<number, number> = {
  1: 4.5,
  2: 4.2,
  3: 3.35,
  4: 2.62,
};

/**
 * Корректировка времени финиша, дополнительное время для обновления результатов.
 */
export const FINISH_TIME_ADJUSTMENT = 0.15;
export const FINISH_TIME_ADDITIONAL_CONST = 2 * millisecondsIn10Minutes; // 20 минут дополнительные, равняется времени запросу на обновление.

export const DISQUALIFICATION_LABELS = [
  'DSQ',
  'DNF',
  'DNS',
  'OUT',
  'CUT',
  'LAP',
  'NP',
  'MRS',
  'MC',
  'UNC',
] as const;

export const RACE_SERIES_CATEGORIES = [
  'APlus',
  'A',
  'BPlus',
  'B',
  'CPlus',
  'C',
  'D',
  'E',
  'WA',
  'WB',
  'WC',
  'WD',
] as const;

export const ZWIFT_CATEGORIES = ['A', 'B', 'C', 'D', 'E'] as const;

export const INTERVAL_IN_SECONDS = [15, 60, 300, 600, 1200, 3600] as const;

/**
 * Типы правил пересчета таблиц, если изменилась категория радера после первого этапа (в последующих) серии.
 * recalculationAll – Пересчёт всех этапов и генерала (полный пересчёт).
 * stepChange – Изменение категории с текущего этапа, без пересчёта прошлых.
 * dsqRecalculation – Дисквалификация с пересчётом всех таблиц.
 * dsqKeep – Дисквалификация без пересчёта.
 * 1. Есть стандартные, a,b,c,d,e. со своими диапазонами по правилам Звифт. Организатор может придумать свои категории со своими категориями. Если райдер после первого этапа серии превысил категории, то придумал 4 варианта:На всех этапах изменяется категория на новую. Все таблицы на этапах и генерал пересчитываются для всех участников. 2-Категория изменяется на новую на текущем этапе. Далее райдер участвует в новой категории. Предыдущие результаты не учитываются, таблицы не пересчитываются. 3-Дисквалификация участника, аннулирование всех результатов, пересчет всех таблиц. 4- Дисквалификация участника. Таблицы не пересчитываются.
 */
export const RIDER_CATEGORIES_RULE_TYPES = [
  'recalculationAll',
  'stepChange',
  'dsqRecalculation',
  'dsqKeep',
] as const;

export const DATE_FOR_ADD_TEAM_RESULTS = '2025-09-01';

export const SERIES_TYPES = ['series', 'tour', 'catchUp', 'criterium', 'endurance'] as const;

export const SERIES_STATUS = ['upcoming', 'ongoing', 'completed'] as const;

export const DOCUMENTATION_TYPES = ['development', 'public', 'organizer'] as const;

/**
 * Типы сери у которых создаются отдельные результаты для каждого этапа
 * (помимо стандартных результатов заезда).
 */
export const SERIES_WITH_STAGE_RESULTS = {
  endurance: true,
  tour: true,
  catchUp: false,
  criterium: false,
  series: false,
};

export const RACE_CUSTOM_TYPES = [
  'catchUp',
  'classicGroup',
  'classicCommon',
  'newbies',
] as const;

export const GROUP_PROTOCOL_EVENT_TYPES = ['classicGroup', 'newbies'];
