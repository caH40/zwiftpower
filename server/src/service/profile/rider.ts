import { User } from '../../Model/User.js';
import { TResponseService } from '../../types/http.interface.js';
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

/**
 * Сервис обновления username пользователя.
 */
export async function putUsernameService({
  username,
  userId,
}: {
  username: string;
  userId: string;
}): Promise<TResponseService<null>> {
  // Проверка пользователя с таким username, игнорируя регистр символов, а также игнорируя документ самого пользователя с userId.
  const userDB = await User.findOne(
    { username: { $regex: '\\b' + username + '\\b', $options: 'i' }, _id: { $ne: userId } },
    { _id: true }
  ).lean();

  if (userDB) {
    throw new Error('Данный username уже используется другим пользователем!');
  }

  const userDBUpdated = await User.findByIdAndUpdate(
    userId,
    { $set: { username } },
    { new: true }
  ).lean();

  if (!userDBUpdated) {
    throw new Error(`Не найден пользователь с _id:${userId} для обновления username!`);
  }

  return {
    data: null,
    message: `Обновлен username пользователя.`,
  };
}
