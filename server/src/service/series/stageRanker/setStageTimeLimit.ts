import { handleAndLogError } from '../../../errors/error.js';
import { SeriesRepository } from '../../../repositories/Series.js';

// types
import { TStageResult } from '../../../types/model.interface.js';
import { TRaceSeriesCategories } from '../../../types/types.interface.js';

/**
 * Проверка результатов этапа на превышение временного лимита
 * и установка поля finishTimeLimit.
 */
export const setStageTimeLimit = async (
  seriesId: string,
  results: TStageResult[]
): Promise<TStageResult[]> => {
  const seriesRepository = new SeriesRepository();
  const series = await seriesRepository.getById(seriesId);

  if (!series) {
    throw new Error(`Не найдена серия с _id: "${seriesId}"`);
  }

  const percentageFromLeader = series.finishTimeLimitOnStage?.percentageFromLeader ?? 0;

  // Не установлен лимит.
  if (percentageFromLeader === 0) {
    return results;
  }

  // Коллекция категорий в серии с соответствующими временными лимитами.
  const categoryTimeLimits = new Map<TRaceSeriesCategories, number>();

  return results.map((result) => {
    const riderCategory = result.category;

    const resultWithInsideLimit = {
      ...result,
      finishTimeLimit: {
        isOutside: false,
        exceededMilliseconds: 0,
      },
    };

    if (!riderCategory) {
      handleAndLogError(
        new Error(
          `Не установлена категория для результата _id: "${result._id}" на этапе серии _id: "${result.series}"`
        )
      );
      return resultWithInsideLimit;
    }

    // TODO: Не учитывается временной штраф в данном расчете!
    const resultTime = result.activityData.durationInMilliseconds;

    // Если лимит для категории ещё не установлен — первый результат → лидер.
    if (!categoryTimeLimits.has(riderCategory)) {
      const finishTimeLimitValue = resultTime + (resultTime * percentageFromLeader) / 100;
      categoryTimeLimits.set(riderCategory, finishTimeLimitValue);

      return resultWithInsideLimit; // Лидер не за пределами лимита.
    }

    const limit = categoryTimeLimits.get(riderCategory)!;

    // Разность между финишным временем райдера и лимитом.
    const rawExceededMilliseconds = resultTime - limit;

    if (rawExceededMilliseconds > 0) {
      // Любое превышение лимита = минимум 1 ms превышения.
      const exceededMilliseconds = Math.ceil(rawExceededMilliseconds);

      // Возвращаем новый объект с флагом, если превышен лимит.
      return {
        ...result,
        finishTimeLimit: {
          isOutside: true,
          exceededMilliseconds,
        },
      };
    }

    return resultWithInsideLimit;
  });
};
