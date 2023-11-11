import { ZwiftResult } from '../../../Model/ZwiftResult.js';
import { filterByRankNewbies } from '../../protocol/newbies/results-filter.js';

// types
import { ZwiftResultSchema } from '../../../types/model.interface.js';

/**
 * изменения ранкинга в протоколе в зависимости от дисквалификации райдера модератором
 */
export const handlerNewbiesModified = async (results: ZwiftResultSchema[]) => {
  // фильтрация и сортировка
  const resultsSorted = filterByRankNewbies(results);

  let rankEvent = 0;
  let resultInRank = true;
  for (const result of resultsSorted) {
    if (
      (result.subgroupLabel === 'C' || result.subgroupLabel === 'D') &&
      result.isDisqualification !== true
    ) {
      resultInRank = true; // необходимо присваивать ранк (место в протоколе)
      rankEvent += 1;
    } else {
      resultInRank = false; // всем группам кроме C,D присваивается место в протоколе равное 0
    }

    await ZwiftResult.findOneAndUpdate(
      {
        _id: result._id,
      },
      {
        isDisqualification: result.isDisqualification,
        disqualification: result.disqualification,
        disqualificationDescription: result.disqualificationDescription,
        rankEvent: resultInRank ? rankEvent : 0,
      }
    );
  }
};
