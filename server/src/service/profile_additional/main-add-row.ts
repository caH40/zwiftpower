import { User } from '../../Model/User.js';
import { getZwiftRiderService } from '../zwift/rider.js';

// types
import { ProfileZwiftAPI } from '../../types/zwiftAPI/profileFromZwift.interface.js';
import {
  ProfileDataInResultWithId,
  ResultEventAdditional,
} from '../../types/types.interface.js';

/**
 * Добавление данных основного профиля Zwift райдера в результат Эвента,
 * который был показан дополнительным профилем Zwift
 * после получения данных результата с ZwiftAPI
 */
export const addMainProfileZwiftToRaw = async (
  results: ResultEventAdditional[]
): Promise<ResultEventAdditional[]> => {
  // ZwiftId всех райдеров в результатах Эвента
  const profileIds: number[] = results.map((result) => result.profileId);

  // поиск Основных пользователей (users), чьи дополнительные профили Звифт
  // участвовали в данном Эвенте (есть profileId в результатах)
  const userMainOnlyIds: { zwiftId: number; zwiftIdAdditional: number[] }[] = await User.find(
    { zwiftIdAdditional: { $in: profileIds } },
    { zwiftId: true, zwiftIdAdditional: true, _id: false }
  ).lean();

  for (const user of userMainOnlyIds) {
    // запрос данных основного профиля с сервера Zwift
    const profileMainZwiftAPI: ProfileZwiftAPI | null = await getZwiftRiderService(
      user.zwiftId
    );

    // при ошибке получения данных профиля с zwiftAPI переход к следующей итерации
    if (!profileMainZwiftAPI) {
      continue;
    }

    const profileDataMain: ProfileDataInResultWithId = {
      profileIdMain: user.zwiftId,
      firstName: profileMainZwiftAPI.firstName,
      lastName: profileMainZwiftAPI.lastName,
      gender: profileMainZwiftAPI.male ? 'MALE' : 'FEMALE',
      weightInGrams: profileMainZwiftAPI.weight,
      heightInCentimeters: profileMainZwiftAPI.height / 10,
      imageSrc: profileMainZwiftAPI.imageSrc,
      countryAlpha3: profileMainZwiftAPI.countryAlpha3,
      age: profileMainZwiftAPI.age,
    };

    for (const result of results) {
      if (user.zwiftIdAdditional.includes(result.profileId)) {
        result.profileDataMain = profileDataMain;
      }
    }
  }

  return [...results];
};
