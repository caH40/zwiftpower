import { handleAndLogError } from '../../../errors/error.js';
import { SeriesRepository } from '../../../repositories/Series.js';

// types
import { TStageResult } from '../../../types/model.interface.js';
import { TRaceSeriesCategories } from '../../../types/types.interface.js';

/**
 * Проверка результатов, которые не попали во временной лимит на этапе
 * и установка поля isOutsideFinishTimeLimit.
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

    if (!riderCategory) {
      handleAndLogError(
        new Error(
          `Не установлена категория для результата _id: "${result._id}" на этапе серии _id: "${result.series}"`
        )
      );
      return result; // возвращаем исходный объект
    }

    const resultTime =
      result.durationInMillisecondsWithPenalties ?? result.activityData.durationInMilliseconds;

    // если лимит для категории ещё не установлен — первый результат → лидер
    if (!categoryTimeLimits.has(riderCategory)) {
      const finishTimeLimitValue = resultTime + (resultTime * percentageFromLeader) / 100;
      categoryTimeLimits.set(riderCategory, finishTimeLimitValue);

      return result; // лидер не за пределами лимита
    }

    const limit = categoryTimeLimits.get(riderCategory)!;

    // возвращаем новый объект с флагом, если превышен лимит
    if (resultTime > limit) {
      return { ...result, isOutsideFinishTimeLimit: true };
    }

    return result;
  });
  // console.log(seriesId, categoryTimeLimits);
};
