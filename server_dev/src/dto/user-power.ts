import { UserPowerFetch } from '../../../common/types/userPower.interface.js';
import { UserPowerDtoArg } from '../types/dto/userPower.interface.js';
import { PowerCurveSchema } from '../types/model.interface.js';

//
// данные мощности определенного райдера для страницы профайл/мощность
export const userPowerDto = ({ powerCurve, powerFromEvents }: UserPowerDtoArg) => {
  const powerCurveForResponse = <PowerCurveSchema>{};
  if (powerCurve) {
    powerCurveForResponse.zwiftId = powerCurve.zwiftId;
    powerCurveForResponse.date = powerCurve.date;
    powerCurveForResponse.pointsWatts = powerCurve.pointsWatts;
    powerCurveForResponse.pointsWattsPerKg = powerCurve.pointsWattsPerKg;
  }

  const powerFromEventsForResponse = powerFromEvents.map((elm) => ({
    ...elm,
    _id: String(elm._id),
  }));

  const userPowerFetch: UserPowerFetch = {
    powerCurve: powerCurve ? powerCurveForResponse : null,
    powerFromEvents: powerFromEventsForResponse,
    message: 'Кривая мощности райдера',
  };

  return userPowerFetch;
};
