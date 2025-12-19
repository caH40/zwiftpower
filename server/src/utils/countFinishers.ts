import { GROUP_PROTOCOL_EVENT_TYPES } from '../assets/constants.js';
import {
  TFinishersCount,
  TRaceSeriesCategories,
  TZwiftCategory,
} from '../types/types.interface.js';

/**
 * Расчет финишировавших райдеров в груупе райдера и в абсолютном зачете, добавление в результат заезда.
 */
export function countFinishers<
  R extends { finishersCount: TFinishersCount; subgroupLabel: TZwiftCategory }[]
>(typeRaceCustom: string, results: R): void {
  const subgroupLabelCounters: Record<TZwiftCategory, number> = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
  };

  results.forEach((r) => subgroupLabelCounters[r.subgroupLabel]++);

  // Определяем тип заезда
  const isGroupRace = GROUP_PROTOCOL_EVENT_TYPES.includes(typeRaceCustom);

  for (const result of results) {
    result.finishersCount = {
      category: isGroupRace
        ? subgroupLabelCounters[result.subgroupLabel] ?? results.length
        : results.length,
      absolute: results.length,
    };
  }
}

export function countFinishersForStageResults<
  R extends { finishersCount: TFinishersCount; category: TRaceSeriesCategories | null }[]
>(results: R): void {
  const categoriesCounters = new Map<TRaceSeriesCategories, number>();

  results.forEach((result) => {
    if (result.category !== null) {
      const counter = categoriesCounters.get(result.category);
      categoriesCounters.set(result.category, counter ? counter + 1 : 1);
    }
  });

  // По умолчанию в сериях с отдельными результатами этапов финишные протоколы только с делением на группы.
  // Если result.category === null то райдер дисквалифицирован и finishersCount.category = 0
  for (const result of results) {
    result.finishersCount = {
      category: result.category !== null ? categoriesCounters.get(result.category) ?? 0 : 0,
      absolute: results.length,
    };
  }
}
