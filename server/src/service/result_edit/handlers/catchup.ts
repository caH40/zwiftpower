import { setDSQWithVirtualPower } from '../../protocol/virtual-power.js';

// types
import { ZwiftResultSchema } from '../../../types/model.interface.js';
import { filterByRankCatchup } from '../../protocol/catchup/results-filter.js';
import { putDSQResult } from './result-put.js';

/**
 * изменения ранкинга в протоколе в зависимости от дисквалификации райдера модератором
 * для заезда CatchUp
 */
export const handlerCatchUpModified = async (results: ZwiftResultSchema[]) => {
  // Фильтрация категорий, сортировка по финишному времени
  const resultsSorted = filterByRankCatchup(results);

  let rankEvent = 1;
  for (const result of resultsSorted) {
    // установка данных дисквалификации при использовании VirtualPower
    // устанавливается заново, если модератором была снята дисквалификация
    const resultWithDSQ = setDSQWithVirtualPower<ZwiftResultSchema>(result);

    // ранк для текущего результата
    const rankForSet = resultWithDSQ.isDisqualification ? 0 : rankEvent++;

    // обновление данных результата по дисквалификации, установка обновленного ранкинга
    await putDSQResult(resultWithDSQ, rankForSet);
  }
};
