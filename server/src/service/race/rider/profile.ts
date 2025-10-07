import { User } from '../../../Model/User.js';
import { getZwiftRiderService } from '../../zwift/rider.js';
import { getCategory } from './category.js';
import { Rider } from '../../../Model/Rider.js';

// types
import type { Profile } from '../../../types/types.interface.js';
import { TeamMemberModel } from '../../../Model/TeamMember.js';
import { checkZwiftId } from '../../zwift/invalid_zwift_id/check.js';

/**
 * Формирование данных профайла райдера (анкета)
 */
export async function getProfileService(zwiftId: number): Promise<Profile> {
  const baseProfile: Profile = {
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
    racingScore: 0,
  };

  // Запрос данных райдера и пользователя из БД параллельно
  const [userDB, riderDB] = await Promise.all([
    User.findOne({ zwiftId }),
    Rider.findOne({ zwiftId }),
  ]);

  const teamMemberDB = await TeamMemberModel.findOne(
    { user: userDB?._id },
    { team: true, _id: false }
  )
    .populate({ path: 'team', select: ['name', 'shortName', 'urlSlug', '-_id'] })
    .lean<{
      team: { name: string; shortName: string; urlSlug: string };
    }>();

  // Если оба найдены, формируем профиль из базы данных
  if (userDB && riderDB) {
    return {
      ...baseProfile,
      imageSrc: riderDB.imageSrc,
      firstName: riderDB.firstName,
      lastName: riderDB.lastName,
      age: riderDB.age,
      weight: riderDB.weight,
      height: riderDB.height,
      countryAlpha3: riderDB.countryAlpha3,
      male: riderDB.male,
      zCategory: riderDB.competitionMetrics?.category,
      zCategoryWomen: riderDB.competitionMetrics?.categoryWomen,
      category: userDB.category,
      bio: userDB.bio,
      racingScore: riderDB.competitionMetrics?.racingScore || 0,
      team: teamMemberDB?.team,
    };
  }

  // Проверка на удаление аккаунта(zwiftId) в звифте.
  const isInvalidZwiftId = await checkZwiftId(zwiftId);

  if (isInvalidZwiftId) {
    return {
      ...baseProfile,
    };
  }

  // Обработка данных через API Zwift, если что-то отсутствует в БД
  const category = await getCategory(zwiftId);
  const riderFromZwift = await getZwiftRiderService(zwiftId);

  if (!riderFromZwift) {
    throw new Error('Не найден райдер на сервере Zwift');
  }

  return {
    ...baseProfile,
    imageSrc: riderFromZwift.imageSrc,
    firstName: riderFromZwift.firstName,
    lastName: riderFromZwift.lastName,
    age: riderFromZwift.age,
    weight: riderFromZwift.weight,
    height: riderFromZwift.height,
    countryAlpha3: riderFromZwift.countryAlpha3,
    male: riderFromZwift.male,
    zCategory: riderFromZwift.competitionMetrics?.category,
    zCategoryWomen: riderFromZwift.competitionMetrics?.categoryWomen,
    racingScore: riderFromZwift.competitionMetrics?.racingScore || 0,
    category: category,
    team: teamMemberDB?.team,
  };
}
