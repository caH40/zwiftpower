import { GROUP_PROTOCOL_EVENT_TYPES } from '../assets/constants.js';
import { TFinishersCount, TZwiftCategory } from '../types/types.interface.js';

/**
 * Расчет финишировавших райдеров в груупе райдера и в абсолютном зачете, добавление в результат заезда.
 */
export function countFinishers<
  T extends { typeRaceCustom: string },
  R extends { finishersCount: TFinishersCount; subgroupLabel: TZwiftCategory }[]
>(event: T, results: R): void {
  const subgroupLabelCounters: Record<TZwiftCategory, number> = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
  };

  results.forEach((r) => subgroupLabelCounters[r.subgroupLabel]++);

  // Определяем тип заезда
  const isGroupRace = GROUP_PROTOCOL_EVENT_TYPES.includes(event.typeRaceCustom);

  for (const result of results) {
    result.finishersCount = {
      category: isGroupRace
        ? subgroupLabelCounters[result.subgroupLabel] ?? results.length
        : results.length,
      absolute: results.length,
    };
  }
}
