import { User } from '../../../Model/User.js';
import { getZwiftRiderService } from '../../zwift/rider.js';

// types
import { Profile } from '../../../types/types.interface.js';
import { getCategory } from './category.js';

/**
 * Формирование данных профайла райдера (анкета)
 */
export async function getProfileService(zwiftId: string) {
  const profile: Profile = {
    zwiftId: +zwiftId,
    ftp: null,
    imageSrc: null,
    firstName: '',
    lastName: '',
    age: 0,
    weight: 0,
    height: 0,
    countryAlpha3: 'rus',
    male: true,
  };

  // Получение данных зарегистрированного райдера для отображения таких как bio
  const userDB = await User.findOne({ zwiftId });

  // если нет результатов райдера в БД берутся данные из API Zwift
  if (!userDB || userDB.zwiftData?.lastName === undefined) {
    const category = await getCategory(zwiftId);
    const rider = await getZwiftRiderService(zwiftId);

    if (!rider) {
      throw new Error('Не найден райдер на сервере Zwift');
    }
    profile.imageSrc = rider.imageSrc;
    profile.firstName = rider.firstName;
    profile.lastName = rider.lastName;
    profile.age = rider.age;
    profile.weight = rider.weight;
    profile.height = rider.height;
    profile.countryAlpha3 = rider.countryAlpha3;
    profile.male = rider.male;
    profile.zCategory = rider.competitionMetrics?.category;
    profile.zCategoryWomen = rider.competitionMetrics?.categoryWomen;
    profile.category = category;

    return profile;
  }

  profile.zwiftId = +zwiftId;
  profile.imageSrc = userDB.zwiftData.imageSrc;
  profile.firstName = userDB.zwiftData.firstName;
  profile.lastName = userDB.zwiftData.lastName;
  profile.age = userDB.zwiftData.age;
  profile.weight = userDB.zwiftData.weight;
  profile.height = userDB.zwiftData.height;
  profile.countryAlpha3 = userDB.zwiftData.countryAlpha3;
  profile.male = userDB.zwiftData.male;
  profile.zCategory = userDB.zwiftData.category;
  profile.zCategoryWomen = userDB.zwiftData.categoryWomen;
  profile.category = userDB.category;
  profile.bio = userDB?.bio;

  return profile;
}
