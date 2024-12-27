import { User as UserModel } from '../../../Model/User.js';
import { getUserProfileVkService } from './profile.js';

// types
import { TResponseService, VkAuthResponse } from '../../../types/http.interface.js';
import { GenerateToken } from '../../../types/auth.interface.js';
import { createDataForClient } from '../auth-response.js';

/**
 * Авторизация пользователя, прошедшего аутентификацию через VK ID, генерирует токены, обновляет или создает запись токенов в базе данных.
 */
export async function linkVKIDService({
  tokens,
  userId,
}: {
  tokens: VkAuthResponse;
  userId: string;
}): Promise<TResponseService<{ user: GenerateToken }>> {
  // Запрос данных пользователя из VK API.
  const { data: userDataFromVK } = await getUserProfileVkService({
    accessToken: tokens.access_token,
  });

  // Проверяем, существует ли пользователь с указанным userId в БД.
  const userDB = await UserModel.findOne({ _id: userId });

  if (!userDB) {
    throw new Error('Пользователь с указанным идентификатором не найден!');
  }

  // Обновляем данные пользователя в БД.
  userDB.externalAccounts = {
    vk: {
      id: userDataFromVK.user_id,
      firstName: userDataFromVK.first_name,
      lastName: userDataFromVK.last_name,
      avatarSrc: userDataFromVK.avatar,
      verified: userDataFromVK.verified,
      gender: userDataFromVK.sex === 1 ? 'female' : 'male', // 1 - женский, 2 - мужской.
      birthday: userDataFromVK.birthday,
      email: userDataFromVK.email,
    },
  };
  userDB.emailConfirm = true; // Пропускаем подтверждение email для регистрации через VK.

  const userLinked = await userDB.save();

  // Создание объекта данных пользователя для отправки на клиент.
  const dataForClient = await createDataForClient({ user: userLinked });

  // Возвращаем данные для клиента.
  return {
    data: { user: dataForClient },
    message: 'VK ID успешно привязан к вашему аккаунту!',
  };
}
