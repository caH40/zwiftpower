import { UserResultsDtoArg } from '../types/dto_inner/userResults.interface.js';
import { PowerCurveSchema } from '../types/model.interface.js';
import { Profile, UserResult } from '../types/types.interface.js';

//
// подготовка данных мощности определенного райдера для страницы профайл/мощность для контроллера
export const userResultsDto = ({ userResults, profile, powerCurve }: UserResultsDtoArg) => {
  const powerCurveForResponse = <PowerCurveSchema>{};
  if (powerCurve) {
    powerCurveForResponse.zwiftId = powerCurve.zwiftId;
    powerCurveForResponse.date = powerCurve.date;
    powerCurveForResponse.pointsWatts = powerCurve.pointsWatts;
    powerCurveForResponse.pointsWattsPerKg = powerCurve.pointsWattsPerKg;
  }

  const userResultsForResponse: UserResult[] = [...userResults];
  const profileForResponse: Profile = { ...profile };

  return {
    userResults: userResultsForResponse,
    profile: profileForResponse,
    powerCurve: powerCurveForResponse,
    message: 'Профайл и результаты райдера',
  };
};
