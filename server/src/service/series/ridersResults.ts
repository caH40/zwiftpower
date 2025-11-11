// types
import { StageResultRepository } from '../../repositories/StageResult.js';
import { TRidersResults } from '../../types/series.types.js';

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
