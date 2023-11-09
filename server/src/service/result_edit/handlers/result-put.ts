import { ZwiftResult } from '../../../Model/ZwiftResult.js';

// types
import { ZwiftResultSchema } from '../../../types/model.interface.js';

/**
 * Обновление данных результата по дисквалификации, установка обновленного ранкинга
 */
export const putDSQResult = async (
  result: ZwiftResultSchema,
  rankForSet: number
): Promise<void> => {
  await ZwiftResult.findOneAndUpdate(
    {
      _id: result._id,
    },
    {
      isDisqualification: result.isDisqualification,
      disqualification: result.disqualification,
      disqualificationDescription: result.disqualificationDescription,
      rankEvent: rankForSet,
    }
  );
};
