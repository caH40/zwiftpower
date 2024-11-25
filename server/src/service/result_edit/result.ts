import { setDisqualification } from './disqualification.js';

// types
import { PutResultParams } from '../../types/types.interface.js';

/**
 * Сервис изменения параметра property в результате Райдера и пересчет протокола Эвента
 */
export const putResultService = async ({
  moderatorId,
  property,
  id,
  value,
  message,
}: PutResultParams): Promise<{ message: string }> => {
  switch (property) {
    case 'disqualification':
      return await setDisqualification({ moderatorId, property, id, value, message });

    default:
      throw new Error('Не найден изменяемый параметр');
  }
};
