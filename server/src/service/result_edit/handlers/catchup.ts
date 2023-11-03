import { ZwiftResult } from '../../../Model/ZwiftResult.js';

// types
import { ZwiftResultSchema } from '../../../types/model.interface.js';

export const handlerCatchUpModified = async (results: ZwiftResultSchema[]) => {
  results.sort(
    (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
  );

  let rankEvent = 1;
  for (const result of results) {
    // если с VIRTUAL_POWER то присваивается 0 место (вне ранкинга)
    const isVirtualPower = result.sensorData.powerType === 'VIRTUAL_POWER';
    const isDisqualification = result.isDisqualification;
    const isNotRanking = isVirtualPower || isDisqualification;
    if (isNotRanking) {
      result.disqualification = 'VIRTUAL_POWER';
      result.disqualificationDescription = 'Виртуальная мощность zPower';
    } else if (isDisqualification) {
      result.disqualification = 'DSQ';
    }

    await ZwiftResult.findOneAndUpdate(
      {
        _id: result._id,
      },
      {
        rankEvent: isNotRanking ? 0 : rankEvent++,
      }
    );
  }
};
