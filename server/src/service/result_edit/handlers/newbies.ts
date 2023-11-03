import { ZwiftResult } from '../../../Model/ZwiftResult.js';
import { filterByRank } from '../../protocol/newbies/results-filter.js';

// types
import { ZwiftResultSchema } from '../../../types/model.interface.js';
import { setDSQWithVirtualPower } from '../../protocol/virtual-power.js';

/**
 * изменения ранкинга в протоколе в зависимости от дисквалификации райдера модератором
 */
export const handlerNewbiesModified = async (results: ZwiftResultSchema[]) => {
  // фильтрация и сортировка
  const resultsSorted = filterByRank(results);

  let rankEvent = 0;
  let resultInRank = true;
  for (const result of resultsSorted) {
    // установка данных дисквалификации при использовании VirtualPower
    const resultWithDSQ = setDSQWithVirtualPower<ZwiftResultSchema>(result);

    if (
      (resultWithDSQ.subgroupLabel === 'C' || resultWithDSQ.subgroupLabel === 'D') &&
      resultWithDSQ.isDisqualification !== true
    ) {
      resultInRank = true; // необходимо присваивать ранк (место в протоколе)
      rankEvent += 1;
    } else {
      resultInRank = false; // всем группам кроме C,D присваивается место в протоколе равное 0
    }

    await ZwiftResult.findOneAndUpdate(
      {
        _id: resultWithDSQ._id,
      },
      {
        isDisqualification: resultWithDSQ.isDisqualification,
        disqualification: resultWithDSQ.disqualification,
        disqualificationDescription: resultWithDSQ.disqualificationDescription,
        rankEvent: resultInRank ? rankEvent : 0,
      }
    );
  }
};
