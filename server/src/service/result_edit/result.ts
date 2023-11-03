import { setDisqualification } from './disqualification.js';

// types
import { PutResultParams } from '../../types/types.interface.js';

/**
 * Сервис изменения параметра property в результате Райдера и пересчет протокола Эвента
 */
export const putResultService = async ({
  userId,
  property,
  data,
  id,
}: PutResultParams): Promise<{ message: string }> => {
  switch (property) {
    case 'isDisqualification':
      return await setDisqualification({ userId, property, data, id });

    default:
      throw new Error('Не найден изменяемый параметр');
  }
};
