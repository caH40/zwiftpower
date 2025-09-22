import { User } from '../../Model/User.js';
import { getZwiftRiderService } from '../zwift/rider.js';

// types
import { ProfileZwiftAPI } from '../../types/zwiftAPI/profileFromZwift.interface.js';
import {
  ProfileDataInResultWithId,
  ResultEventAdditional,
  TTeamForProfile,
} from '../../types/types.interface.js';
import { Types } from 'mongoose';
import { TeamMemberModel } from '../../Model/TeamMember.js';

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
  const userMainOnlyIds = await User.find(
    { zwiftIdAdditional: { $in: profileIds } },
    { zwiftId: true, zwiftIdAdditional: true }
  ).lean<{ zwiftId: number; zwiftIdAdditional: number[]; _id: Types.ObjectId }[]>();

  for (const user of userMainOnlyIds) {
    // запрос данных основного профиля с сервера Zwift
    const profileMainZwiftAPI: ProfileZwiftAPI | null = await getZwiftRiderService(
      user.zwiftId
    );

    // при ошибке получения данных профиля с zwiftAPI переход к следующей итерации
    if (!profileMainZwiftAPI) {
      continue;
    }

    const teamMemberDB = await TeamMemberModel.findOne(
      { user: user._id },
      { _id: false, team: true }
    )
      .populate({ path: 'team', select: ['-_id', 'name', 'shortName', 'urlSlug'] })
      .lean<{ team: TTeamForProfile }>();

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
      team: teamMemberDB?.team,
    };

    for (const result of results) {
      if (user.zwiftIdAdditional.includes(result.profileId)) {
        result.profileDataMain = profileDataMain;
      }
    }
  }

  return [...results];
};
