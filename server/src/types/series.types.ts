import { INTERVAL_IN_SECONDS, riderCategoryRuleTypes } from '../assets/constants';
import { TCategorySeries } from './types.interface';

/**
 * Типы правил пересчета таблиц, если изменилась категория радера после первого этапа (в последующих) серии.
 */
export type TRiderCategoryRuleType = (typeof riderCategoryRuleTypes)[number];

export type TIntervalInSeconds = (typeof INTERVAL_IN_SECONDS)[number];

/**
 * min включительно
 * max не включительно
 */
export type TRange = {
  min: number;
  max: number;
};

/**
 * Данные райдера в заезде на определенном интервале
 */
export type TRiderPowers = {
  interval: TIntervalInSeconds;
  watt: number;
  wattPerKg: number;
};

/**
 * Временной интервал с диапазонами мощности и логикой, как учитывать результаты watt и wattPerKg.
 */
export type TCategoryRange = {
  interval: TIntervalInSeconds; // Временной интервал.
  watt?: TRange; // Абсолютные ватты на интервале.
  wattPerKg?: TRange; // Удельные ватты на интервале.
  logic?: 'AND' | 'OR';
};

/**
 * Категоризация по ватт/кг и(или) ваттам на интервалах.
 */
export type TCategoriesWithRange = {
  label: TCategorySeries;
  ranges: TCategoryRange[]; // Массив элементов по interval
};

/**
 * Категоризация по рейтинговым очкам.
 */
export type TRacingScoreRange = {
  label: TCategorySeries;
  range: TRange;
};
