import { User } from '../../../Model/User.js';
import { GetProfileArg, Profile } from '../../../types/types.interface.js';
import { getZwiftRiderService } from '../../zwift/rider.js';

export async function getProfile({ zwiftId, powerCurve, resultLast }: GetProfileArg) {
  const userDB = await User.findOne({ zwiftId });
  const profile: Profile = {
    ftp: null,
    imageSrc: null,
    firstName: '',
    lastName: '',
    age: 0,
    weightInGrams: 0,
  };

  if (!userDB) {
    throw new Error(`Не найден райдер с zwiftId:${zwiftId}`);
  }

  // добавление ftp в объект профиля
  if (powerCurve) {
    const cp = powerCurve.pointsWattsPerKg.find((cp) => cp.duration === 1200);
    if (!cp) {
      profile.ftp = null;
      return profile;
    }
    const ftp = Math.trunc(cp.value * 95) / 100;
    profile.ftp = ftp;
  } else {
    profile.ftp = null;
  }

  // если нет результатов райдера в БД
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
    profile.bio = userDB?.bio;

    return profile;
  }

  profile.imageSrc = resultLast.profileData.imageSrc;
  profile.firstName = resultLast.profileData.firstName;
  profile.lastName = resultLast.profileData.lastName;
  profile.age = resultLast.profileData.age;
  profile.weightInGrams = resultLast.profileData.weightInGrams.value;
  profile.bio = userDB?.bio;

  return profile;
}
