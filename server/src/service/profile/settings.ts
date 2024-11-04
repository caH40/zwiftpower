import { User } from '../../Model/User.js';
import { TResponseService } from '../../types/http.interface.js';
import { TNotifications, TUserStreams } from '../../types/model.interface.js';

type Params = {
  zwiftId: number;
};

/**
 * Получение настроек пользователя для профиля.
 */
export async function getUserSettingsService({
  zwiftId,
}: Params): Promise<TResponseService<{ streams: TUserStreams }>> {
  const userDB = await User.findOne(
    { zwiftId },
    { streams: true, notifications: true, _id: false }
  ).lean<{
    streams: TUserStreams;
    notifications: TNotifications;
  }>();

  if (!userDB) {
    throw new Error(`Не найден пользователь с zwiftId:${zwiftId} в БД!`);
  }

  const message = `Данные настроек профиля zwiftId:${zwiftId}`;

  return { data: userDB, message };
}
