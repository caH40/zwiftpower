// types
import { UserProfileFetch } from '../common/types/userProfile.interface.js';
import { PowerCurveSchema } from '../types/model.interface.js';
import { Profile } from '../types/types.interface.js';

/**
 *  Подготавливает данные профайла для отправки на клиент
 */
export const userProfileDto = ({
  profile,
  powerCurve,
  quantityRace,
}: {
  profile: Profile;
  powerCurve: PowerCurveSchema | null;
  quantityRace: number;
}) => {
  const powerCurveForResponse: PowerCurveSchema | null = powerCurve ? { ...powerCurve } : null;

  const profileForResponse: Profile = { ...profile };

  const userProfileFetch: UserProfileFetch = {
    profile: profileForResponse,
    powerCurve: powerCurveForResponse,
    quantityRace,
    message: 'Профиль райдера',
  };

  return userProfileFetch;
};
