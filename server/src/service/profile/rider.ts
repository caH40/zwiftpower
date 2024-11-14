import { User } from '../../Model/User.js';
import { updateRidersProfiles } from '../updates/riders-profile.js';

/**
 * Сервис обновления данных с API Zwift для профиля (Rider) пользователя.
 */
export async function updateProfileService(userId: string) {
  const userDB = await User.findOne({ _id: userId }, { _id: false, zwiftId: true }).lean<{
    zwiftId: number;
  }>();

  if (!userDB) {
    throw new Error(`Не найден Профиль пользователя для обновления userId${userId}`);
  }

  await updateRidersProfiles([userDB.zwiftId]);

  return {
    message: `Обновлены данные профиля ${userDB.zwiftId} на zwiftpower.ru `,
  };
}
