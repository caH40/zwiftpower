import { UserResultFetch } from '../common/types/userResults.interface.js';
import { UserResultsDtoArg } from '../types/dto_inner/userResults.interface.js';
import { PowerCurveSchema } from '../types/model.interface.js';
import { Profile, UserResult } from '../types/types.interface.js';

//
// подготовка данных мощности определенного райдера для страницы профайл/мощность для контроллера
export const userResultsDto = ({ userResults, profile, powerCurve }: UserResultsDtoArg) => {
  const powerCurveForResponse: PowerCurveSchema | null = powerCurve ? { ...powerCurve } : null;

  const userResultsForResponse: UserResult[] = [...userResults];
  const profileForResponse: Profile = { ...profile };

  const userResultFetch: UserResultFetch = {
    userResults: userResultsForResponse,
    profile: profileForResponse,
    powerCurve: powerCurveForResponse,
    message: 'Профайл и результаты райдера',
  };

  return userResultFetch;
};
