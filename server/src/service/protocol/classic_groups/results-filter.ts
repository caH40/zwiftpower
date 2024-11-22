import { setDSQWithVirtualPower } from '../virtual-power.js';
import { errorHandler } from '../../../errors/error.js';

// types
import { ZwiftResultSchema } from '../../../types/model.interface.js';
import { ResultEventAdditional } from '../../../types/types.interface.js';

/**
 * Фильтрация и сортировка категорий для Эвента "Классическая с группами" (classicGroup)
 * Дисквалификация райдеров с "Виртуальной мощностью"
 * Сортировка результатов по финишному времени, кроме дисквалифицированных.
 * далее сортировка результатов в категории "E", участники участвуют вне зачета
 *
 */
export const filterByRankClassicGroups = <T extends ResultEventAdditional | ZwiftResultSchema>(
  results: T[]
): T[] => {
  try {
    // установка данных дисквалификации при использовании VirtualPower
    const resultsWithVP = results.map((result) => setDSQWithVirtualPower(result));

    // фильтрация и сортировка валидных результатов
    const resultsABCDE = resultsWithVP
      .filter((result) => result.isDisqualification !== true)
      .sort(
        (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
      );

    // фильтрация и сортировка дисквалифицированных результатов
    const resultsOthers = resultsWithVP
      .filter((result) => result.isDisqualification)
      .sort(
        (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
      );

    return [...resultsABCDE, ...resultsOthers];
  } catch (error) {
    errorHandler(error);
    return results;
  }
};
