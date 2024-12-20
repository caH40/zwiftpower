import { Types } from 'mongoose';

import { User as UserModel } from '../../../Model/User.js';
import { getUserProfileVkService } from './profile.js';
import { generateTemporaryValue } from '../../../utils/temporaryValue.js';
import { Token as TokenAuthModel } from '../../../Model/Token.js';
import { dtoResponseAfterRegistration } from '../../../dto/token.js';

// types
import { TResponseService, VkAuthResponse } from '../../../types/http.interface.js';
import { TResponseAfterRegistrationDto } from '../../../types/types.interface.js';

/**
 * Регистрация нового пользователя через VK ID.
 */
export async function registrationVKIDService({
  tokens,
  deviceId,
}: {
  tokens: VkAuthResponse;
  deviceId: string;
}): Promise<TResponseService<TResponseAfterRegistrationDto>> {
  if (!tokens.access_token) {
    throw new Error('Не получен токен доступа, модуль registrationVKID');
  }

  // Запрос данных пользователя из VK API.
  const { data: candidate } = await getUserProfileVkService({
    accessToken: tokens.access_token,
  });

  const userDBForCheck = await UserModel.findOne(
    { 'externalAccounts.vk.id': candidate.user_id },
    { _id: true }
  ).lean<{ _id: Types.ObjectId }>();

  // Проверка существует ли пользователь с такими данными в БД.
  if (userDBForCheck) {
    throw new Error(
      'Пользователь с таким VK ID уже зарегистрирован. Авторизуйтесь через страницу Входа на сайт.'
    );
  }

  // Создание документа пользователя User в БД.
  const userDB = await UserModel.create({
    username: generateTemporaryValue(`temp_${candidate.first_name}`),
    email: `${generateTemporaryValue('temp_email')}@example.com`,
    password: generateTemporaryValue('temp_password'),
    role: 'user',
    date: Date.now(),
    externalAccounts: {
      vk: {
        id: candidate.user_id,
        firstName: candidate.first_name,
        lastName: candidate.last_name,
        avatarSrc: candidate.avatar,
        verified: candidate.verified,
        gender: candidate.sex === 1 ? 'female' : 'male', // Пол: 0 - не указан, 1 - женский, 2 - мужской.
        birthday: candidate.birthday,
        email: candidate.email,
      },
    },
    emailConfirm: true, // Исключение проверки email для регистрации через логин/пароль.
  });

  if (!userDB?._id) {
    throw new Error('Ошибка при создании пользователя в БД, модуль registrationVKIDService');
  }

  const vkTokens = {
    deviceId: deviceId,
    refreshToken: tokens.refresh_token,
    accessToken: tokens.access_token,
    state: tokens.state,
    scope: tokens.scope,
    expiresIn: tokens.expires_in,
  };

  // Создание документа Токенов аутентификации пользователя.
  const tokenDB = await TokenAuthModel.create({
    userId: userDB._id,
    'externalTokens.vk': [vkTokens],
  });

  const accessToken = tokenDB.externalTokens.vk[0].accessToken;
  if (!accessToken) {
    throw new Error(
      'Ошибка при создании токенов для пользователя в БД, модуль registrationVKIDService'
    );
  }

  const dataForResponse = dtoResponseAfterRegistration({
    accessToken,
    authType: 'vk',
    user: userDB,
  });

  return { data: dataForResponse, message: 'Успешная регистрация!' };
}
