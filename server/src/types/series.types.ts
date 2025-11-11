import { INTERVAL_IN_SECONDS, RIDER_CATEGORIES_RULE_TYPES } from '../assets/constants';
import { TStagesResultsForGC } from './mongodb-response.types';
import { TRaceSeriesCategories } from './types.interface';

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
