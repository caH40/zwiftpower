import { User } from '../../../Model/User.js';
import { GetProfileArg, Profile } from '../../../types/types.interface.js';
import { getZwiftRiderService } from '../../zwift/rider.js';

/**
 * Формирование данный профайла райдера (анкета)
 */
export async function getProfile({ zwiftId, powerCurve, resultLast }: GetProfileArg) {
  const profile: Profile = {
    zwiftId: +zwiftId,
    ftp: null,
    imageSrc: null,
    firstName: '',
    lastName: '',
    age: 0,
    weightInGrams: 0,
  };

  // добавление ftp в объект профиля
  if (powerCurve) {
    const cp = powerCurve.pointsWattsPerKg.find((cp) => cp.duration === 1200);

    // ftp рассчитывается как 95% от результата за 20 минут
    const ftp = cp ? Math.trunc(cp.value * 95) / 100 : null;
    profile.ftp = ftp;
  } else {
    profile.ftp = null;
  }

  // Получение данных зарегистрированного райдера для отображения таких как bio
  const userDB = await User.findOne({ zwiftId });

  // если нет результатов райдера в БД берутся данные из API Zwift
  if (!resultLast) {
    const rider = await getZwiftRiderService(zwiftId);

    if (!rider) {
      throw new Error('Не найден райдер на сервере Zwift');
    }
    profile.imageSrc = rider.imageSrc;
    profile.firstName = rider.firstName;
    profile.lastName = rider.lastName;
    profile.age = rider.age;
    profile.weightInGrams = rider.weight;

    return profile;
  }

  profile.zwiftId = +zwiftId;
  profile.imageSrc = resultLast.profileData.imageSrc;
  profile.firstName = resultLast.profileData.firstName;
  profile.lastName = resultLast.profileData.lastName;
  profile.age = resultLast.profileData.age;
  profile.weightInGrams = resultLast.profileData.weightInGrams.value;
  profile.bio = userDB?.bio;

  return profile;
}
