// types
import { TCategoriesWithRange, TRiderPowers } from '../types/series.types';
import { TCategorySeries } from '../types/types.interface';

/**
 * Райдер проехал дистанцию и у него посчитаны ватты и удельные ватты на
 * стандартных интервалах: 15, 60, 300, 1200.
 *
 * Получить интервалы по которым определяется категория в Серии заездов.
 *
 * min включительно
 * max не включительно
 *
 * Определение категории происходит с верхней категории, если условия удовлетворяют,
 * значит категория определена.
 *
 */

const categoriesWithRange: TCategoriesWithRange[] = [
  {
    label: 'BPlus',
    ranges: [
      { interval: 60, wattPerKg: { min: 5.8, max: 6.75 } },
      { interval: 300, wattPerKg: { min: 4.5, max: 5.1 } },
      { interval: 1200, wattPerKg: { min: 3.9, max: 4.4 } },
    ],
  },
  {
    label: 'A',
    ranges: [
      { interval: 60, wattPerKg: { min: 6.75, max: 7.65 } },
      { interval: 300, wattPerKg: { min: 5.1, max: 5.55 } },
      { interval: 1200, wattPerKg: { min: 4.4, max: 4.8 } },
    ],
  },
  {
    label: 'APlus',
    ranges: [
      { interval: 60, wattPerKg: { min: 7.65, max: 20 } },
      { interval: 300, wattPerKg: { min: 5.55, max: 20 } },
      { interval: 1200, wattPerKg: { min: 4.8, max: 20 } },
    ],
  },
];

const riderPowers: TRiderPowers[] = [
  { interval: 15, watt: 1200, wattPerKg: 20 },
  { interval: 60, watt: 600, wattPerKg: 10 },
  { interval: 300, watt: 300, wattPerKg: 5 },
  { interval: 1200, watt: 240, wattPerKg: 4 },
];

/**
 * Функция определения категории.
 * @param {Object} params - входные параметры.
 * @param params.riderPowers - Данные райдера по мощности на интервалах.
 * @param params.categoriesWithRange - Правила категоризации в Серии заездов.
 */
export function determineCategory({
  riderPowers,
  categoriesWithRange,
}: {
  riderPowers: TRiderPowers[];
  categoriesWithRange: TCategoriesWithRange;
}): TCategorySeries | null {
  return null;
}
