import { UserPowerFetch } from '../../../common/types/userPower.interface.js';
import { UserPowerDtoArg } from '../types/dto_inner/userPower.interface.js';
import { PowerCurveSchema } from '../types/model.interface.js';

//
// данные мощности определенного райдера для страницы профайл/мощность
export const userPowerDto = ({ powerCurve, powerFromEvents }: UserPowerDtoArg) => {
  const powerCurveForResponse: PowerCurveSchema | null = powerCurve ? { ...powerCurve } : null;

  const powerFromEventsForResponse = powerFromEvents.map((elm) => ({
    ...elm,
    _id: String(elm._id),
  }));

  // подготовленные данные для отправки при запросах API
  const userPowerFetch: UserPowerFetch = {
    powerCurve: powerCurveForResponse,
    powerFromEvents: powerFromEventsForResponse,
    message: 'Кривая мощности райдера',
  };

  return userPowerFetch;
};
