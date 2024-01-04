import { ZwiftResult } from '../../../Model/ZwiftResult.js';

// types
import { ZwiftResultSchema } from '../../../types/model.interface.js';
import { setDSQWithVirtualPower } from '../../protocol/virtual-power.js';

type Label = 'A' | 'B' | 'C' | 'D' | 'E';

/**
 * изменения ранкинга (по умолчанию) в протоколе в зависимости от дисквалификации райдера модератором
 * для Эвентов типа classicGroup
 */
export const handlerClassicGroups = async (results: ZwiftResultSchema[]) => {
  results.sort(
    (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
  );

  const rank = {
    A: 1,
    B: 1,
    C: 1,
    D: 1,
    E: 0,
  };

  for (const result of results) {
    // установка данных дисквалификации при использовании VirtualPower
    const resultWithDSQ = setDSQWithVirtualPower<ZwiftResultSchema>(result);

    const subgroupLabel = result.subgroupLabel as Label;
    const label: Label = subgroupLabel ? subgroupLabel : 'E';

    const newRankEvent = resultWithDSQ.isDisqualification ? 0 : rank[label]++;

    await ZwiftResult.findOneAndUpdate(
      {
        _id: resultWithDSQ._id,
      },
      {
        isDisqualification: resultWithDSQ.isDisqualification,
        disqualification: resultWithDSQ.disqualification,
        disqualificationDescription: resultWithDSQ.disqualificationDescription,

        rankEvent: resultWithDSQ.isDisqualification ? 0 : newRankEvent,
      }
    );
  }
};
