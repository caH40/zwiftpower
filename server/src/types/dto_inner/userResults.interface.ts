import { PowerCurveSchema } from '../model.interface.js';
import { Profile, UserResult } from '../types.interface.js';

/**
 * Интерфейс входящих аргументов ДТО для результатов райдера для страницы профиль/результаты
 */
export interface UserResultsDtoArg {
  userResults: UserResult[];
  profile: Profile;
  powerCurve: PowerCurveSchema | null;
}
