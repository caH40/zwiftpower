import { ZwiftResult } from '../../../Model/ZwiftResult.js';

// types
import { ZwiftResultSchema } from '../../../types/model.interface.js';
import { setDSQWithVirtualPower } from '../../protocol/virtual-power.js';

export const handlerCatchUpModified = async (results: ZwiftResultSchema[]) => {
  results.sort(
    (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
  );

  let rankEvent = 1;
  for (const result of results) {
    // установка данных дисквалификации при использовании VirtualPower
    const resultWithDSQ = setDSQWithVirtualPower<ZwiftResultSchema>(result);

    await ZwiftResult.findOneAndUpdate(
      {
        _id: resultWithDSQ._id,
      },
      {
        isDisqualification: resultWithDSQ.isDisqualification,
        disqualification: resultWithDSQ.disqualification,
        disqualificationDescription: resultWithDSQ.disqualificationDescription,
        rankEvent: resultWithDSQ.isDisqualification ? 0 : rankEvent++,
      }
    );
  }
};
