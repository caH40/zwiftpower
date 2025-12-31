// types
import { StageResultRepository } from '../../repositories/StageResult.js';
import { TStagesResultsForGC } from '../../types/mongodb-response.types.js';
import { TEmptyGCRiderStage, TGCRiderStage, TRidersResults } from '../../types/series.types.js';

/**
 * Приватный метод для группировки результатов по райдерам.
 * Возвращает Map, где ключ — profileId райдера, а значение — массив его результатов.
 */
export async function createRidersResults(seriesId: string): Promise<TRidersResults> {
  const stageResultRepository = new StageResultRepository();
  // Все результаты текущей серии заездов.
  const allStagesResults = await stageResultRepository.getAllStagesResults(seriesId);

  // Группируем все результаты этапов по riderId (profileId).
  const riderResultsInMap = allStagesResults.reduce<TRidersResults>((acc, cur) => {
    // Получаем текущие результаты райдера, если они есть.
    const existing = acc.get(cur.profileId);

    // Создаём новый массив результатов:
    // если уже есть результаты — добавляем текущий к копии.
    // если нет — создаём массив с одним элементом.
    const updatedResults = existing ? [...existing.results, cur] : [cur];

    // Обновляем Map: либо перезаписываем с новым массивом, либо добавляем новую запись.
    acc.set(cur.profileId, { results: updatedResults });

    return acc;
  }, new Map());

  return riderResultsInMap;
}

/**
 * Создание списка этапов с необходимыми данными, в которых участвовал райдер.
 * @param {Object} param0 - Входящий параметр.
 * @param {TStagesResultsForGC[]} param0.results - Результаты текущего райдера в серии заездов.
 * @param {TStagesResultsForGC[]} param0.allStageOrders - Номера всех этапов в серии заездов.
 */
export function createStagesForRider({
  allStageOrders,
  results,
}: {
  allStageOrders: number[];
  results: TStagesResultsForGC[];
}): (TGCRiderStage | TEmptyGCRiderStage)[] {
  return allStageOrders.map((stageOrder) => {
    const stage = results.find((s) => s.order === stageOrder);

    if (stage) {
      return {
        category: stage.category,
        profileData: stage.profileData,
        stageOrder: stage.order,
        durationInMilliseconds: stage.activityData.durationInMilliseconds,
        finishPoints: stage.points?.finishPoints || 0,
        modifiedCategory: stage.modifiedCategory,
        distanceInMeters: stage.activityData.segmentDistanceInMeters || 0,
        elevationInMeters: stage.activityData.elevationInMeters || 0,
        calories: stage.activityData.calories || 0,
      };
    } else {
      // Создание пустых элементов в массиве этапов вместо тех, которые райдер не проехал или не финишировал (был дисквалифицирован).
      return {
        category: null,
        profileData: null,
        stageOrder: stageOrder,
        durationInMilliseconds: 0,
        finishPoints: 0,
        distanceInMeters: 0,
        elevationInMeters: 0,
        calories: 0,
      };
    }
  });
}
