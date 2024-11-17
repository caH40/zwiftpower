import { PowerCurve } from '../../Model/PowerCurve.js';
import { getRiderWithMaxPowerInInterval } from './power.js';
import { getRiderWithMaxWattsPerKgInInterval } from './powerPerKg.js';

import { User } from '../../Model/User.js';
import { intervalsForLeaders } from '../../assets/intervals.js';
import { getProfilesData, addProfileData } from './profiles-data.js';

// types
import { PowerCurveSchema } from '../../types/model.interface.js';
import {
  RiderMaxWatt,
  RiderMaxWattsPerKg,
  UsersWithAdditionalProfiles,
} from '../../types/types.interface.js';

/**
 * Лидеры по мощности и удельной мощности
 * @param isMale - получение данных для мужчин или женщин
 */
export const getLeadersInIntervalsService = async (isMale: boolean) => {
  // Получение данных всех профилей Rider.
  const profilesData = await getProfilesData(isMale);

  const zwiftIds = [...profilesData.keys()];

  // получение powerCurve всех райдеров
  const powerCurveDB: PowerCurveSchema[] = await PowerCurve.find({ zwiftId: zwiftIds }).lean();

  // поиск пользователей (users) у которых есть дополнительные профили
  const usersWithAdditionalProfiles: UsersWithAdditionalProfiles[] = await User.find(
    { $and: [{ zwiftIdAdditional: { $ne: null } }, { zwiftIdAdditional: { $ne: [] } }] },
    { zwiftId: true, zwiftIdAdditional: true, _id: false }
  ).lean();

  // инициализация массивов
  const maxWatts: RiderMaxWatt[] = [];
  const maxWattsPerKg: RiderMaxWattsPerKg[] = [];

  for (const interval of intervalsForLeaders) {
    const riderMaxWatt = getRiderWithMaxPowerInInterval(
      powerCurveDB,
      interval,
      usersWithAdditionalProfiles
    );
    const riderMaxWattsPerKg = getRiderWithMaxWattsPerKgInInterval(
      powerCurveDB,
      interval,
      usersWithAdditionalProfiles
    );
    maxWatts.push(...riderMaxWatt);
    maxWattsPerKg.push(...riderMaxWattsPerKg);
  }

  // Добавление данных профиля.
  const { maxWattsWithProfile, maxWattsPerKgWithProfile } = addProfileData(
    maxWatts,
    maxWattsPerKg,
    profilesData
  );

  return { maxWattsWithProfile, maxWattsPerKgWithProfile };
};
