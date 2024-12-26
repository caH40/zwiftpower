import { User as UserModel } from '../../../Model/User.js';
import { getUserProfileVkService } from './profile.js';

// types
import { TResponseService, VkAuthResponse } from '../../../types/http.interface.js';
import { TDeviceInfo, TLocationInfo } from '../../../types/model.interface.js';
import { ResponseAuthService } from '../../../types/auth.interface.js';
import { generateAuthResponse } from '../auth-response.js';

/**
 * Авторизация пользователя, прошедшего аутентификацию через VK ID, генерирует токены, обновляет или создает запись токенов в базе данных.
 *
 * @param tokens - Токены, полученные от VK API.
 * @param device - Информация об устройстве пользователя.
 * @param location - (Необязательно) Данные о местоположении пользователя.
 *
 * @returns Данные о зарегистрированном пользователе и сгенерированные токены.
 */
export async function authorizationVKIDService({
  tokens,
  device,
  location,
}: {
  tokens: VkAuthResponse;
  device: TDeviceInfo;
  location?: TLocationInfo;
}): Promise<TResponseService<ResponseAuthService>> {
  // Запрос данных пользователя из VK API.
  const { data: userDataFromVK } = await getUserProfileVkService({
    accessToken: tokens.access_token,
  });

  // Проверяем, существует ли пользователь с указанным VK ID в БД.
  const userDB = await UserModel.findOne({ 'externalAccounts.vk.id': userDataFromVK.user_id });

  if (!userDB) {
    throw new Error(
      'Не найден пользователь с таким VK ID. Пройдите регистрацию на сайте через сервис VK ID.'
    );
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

  await userDB.save();

  // Генерация токенов для пользователя, обновление/создание записи в базе данных, формирование необходимых данных о пользователе, отправляемых на клиент.
  const { dataForClient, tokensGenerated } = await generateAuthResponse({
    user: userDB,
    device,
    location,
    authService: 'vk',
  });

  // Возвращаем данные для клиента.
  return {
    data: { user: dataForClient, tokens: tokensGenerated },
    message: 'Успешная аутентификация!',
  };
}
