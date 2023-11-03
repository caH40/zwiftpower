// types
import { ZwiftResultSchema } from '../../types/model.interface.js';
import { ResultEventAdditional } from '../../types/types.interface.js';

/**
 * Установка данных дисквалификации при использовании VirtualPower вместо измерителя мощности
 */
export function setDSQWithVirtualPower<T extends ZwiftResultSchema | ResultEventAdditional>(
  result: T
): T {
  // если с VIRTUAL_POWER то присваивается 0 место (вне ранкинга)
  const isVirtualPower = result.sensorData.powerType === 'VIRTUAL_POWER';

  // если VirtualPower то Дисквалификация не снимается (при ручном снятии DSQ)
  if (isVirtualPower) {
    result.isDisqualification = true;
    result.disqualification = 'VIRTUAL_POWER';
    result.disqualificationDescription = 'Виртуальная мощность zPower';
  }

  return result;
}
