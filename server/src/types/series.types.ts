import { INTERVAL_IN_SECONDS, RIDER_CATEGORIES_RULE_TYPES } from '../assets/constants';
import { ProfileDataInResult, TRaceRank } from './model.interface';

// types
import { TRaceSeriesCategories } from './types.interface';
import { TStagesResultsForGC } from './mongodb-response.types';

/**
 * Типы правил пересчета таблиц, если изменилась категория радера после первого этапа (в последующих) серии.
 */
export type TRiderCategoryRuleType = (typeof RIDER_CATEGORIES_RULE_TYPES)[number];

export type TIntervalInSeconds = (typeof INTERVAL_IN_SECONDS)[number];

/**
 * min включительно
 * max не включительно
 */

/**
 * CP райдера в заезде на интервале interval.
 */
export type TFtpData = {
  watt: number;
  wattPerKg: number;
};

export type TRange = {
  value: number;
  operand: '>' | '<' | '>=' | '<='; // Выбирается диапазон относительно value
};

/**
 * Временной интервал с диапазонами мощности и логикой, как учитывать результаты  wattPerKg.
 * }
 */
export type TCategoryRange = {
  interval: TIntervalInSeconds; // Временной интервал.
  wattPerKg: TRange;
};

/**
 *
 */
export type TCategoriesWithRange = {
  label: TRaceSeriesCategories;
  ftpRange: {
    wattPerKg: TRange;
    watt?: TRange;
    wattLogic?: 'AND' | 'OR'; // Как учитывать абсолютные ватты FTP с удельными ваттами FTP и дополнительными интервалами.
  };
  ranges: TCategoryRange[]; // Массив элементов по interval. Достаточно совпадения любого интервала.
};

/**
 * Категоризация по рейтинговым очкам.
 */
export type TRacingScoreRange = {
  label: TRaceSeriesCategories;
  range: {
    min: number;
    max: number;
  };
};

// Тип: отображение riderId → список его результатов
export type TRidersResults = Map<number, { results: TStagesResultsForGC[] }>;

/**
 * Данные райдера в этапе серии соревнований в генеральной классификации.
 * Если райдер не участвовал в этапе, то элемент всё равно создается с нулевыми данными и указанием stageOrder
 */
export type TGCRiderStage = {
  category: TRaceSeriesCategories | null; // Итоговая категория, после модерации (если была).
  stageOrder: number; // Порядковый номер этапа в туре.
  durationInMilliseconds: number; // Время прохождения этапа (в миллисекундах). 0 - райдер не финишировал на данном этапе.
  distanceInMeters: number; // Пройденное расстояние на этапе.
  elevationInMeters: number; // Набор высоты за этап.
  calories: number; // Калории за этап.
  finishPoints: number; // Заработанные финишные очки за этап.
  // includeInTotal: boolean; // Флаг, указывающий, влияет ли этап на суммарные очки.
  profileData: ProfileDataInResult | null; // Данные профиля райдера на этапе. null - райдер не финишировал на данном этапе.
  raceRank: TRaceRank | null; // Место на этапе в категориях.
};
export type TEmptyGCRiderStage = {
  category: null;
  profileData: null;
  stageOrder: number;
  durationInMilliseconds: number;
  finishPoints: number;
  distanceInMeters: number;
  elevationInMeters: number;
  calories: number;
  raceRank: null;
};

export type TFinishTimeLimitOnStage = {
  percentageFromLeader: number; // Допустимое отставание от времени лидера в процентах.
  enforcement: 'auto' | 'manual'; // Автоматическая или ручная дисквалификация.
};

/**
 * Финишное классификационное время у учетом правила общего времени при попадании в допустимый разрыв.
 */
export type TFinishTimeClassification = {
  timeInMilliseconds: number;
  gapToLeaderInMilliseconds: number;
};
