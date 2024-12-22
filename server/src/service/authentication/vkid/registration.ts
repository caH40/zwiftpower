import { Types } from 'mongoose';
import { User as UserModel } from '../../../Model/User.js';
import { getUserProfileVkService } from './profile.js';
import { generateTemporaryValue } from '../../../utils/temporaryValue.js';
import { TokenAuthModel } from '../../../Model/TokenAuth.js';

// types
import { TResponseService, VkAuthResponse } from '../../../types/http.interface.js';
import { TDeviceInfo, TLocationInfo } from '../../../types/model.interface.js';
import { generateToken } from '../token.js';
import { GenerateToken } from '../../../types/auth.interface.js';

type ResponseRegistrationVKIDService = {
  user: GenerateToken;
  tokens: { accessToken: string; refreshToken: string };
};

/**
 * Регистрация нового пользователя через VK ID.
 *
 * @param tokens - Токены, полученные от VK API.
 * @param device - Информация об устройстве пользователя.
 * @param location - (Необязательно) Данные о местоположении пользователя.
 * @returns Данные о зарегистрированном пользователе и сгенерированные токены.
 */
export async function registrationVKIDService({
  tokens,
  device,
  location,
}: {
  tokens: VkAuthResponse;
  device: TDeviceInfo;
  location?: TLocationInfo;
}): Promise<TResponseService<ResponseRegistrationVKIDService>> {
  if (!tokens.access_token) {
    throw new Error('Не получен токен доступа, модуль registrationVKID');
  }

  // Запрос данных пользователя из VK API.
  const { data: candidate } = await getUserProfileVkService({
    accessToken: tokens.access_token,
  });

  // Проверяем, существует ли пользователь с указанным VK ID в БД.
  const userDBForCheck = await UserModel.findOne(
    { 'externalAccounts.vk.id': candidate.user_id },
    { _id: true }
  ).lean<{ _id: Types.ObjectId }>();

  if (userDBForCheck) {
    throw new Error(
      'Пользователь с таким VK ID уже зарегистрирован. Авторизуйтесь через страницу Входа на сайт.'
    );
  }

  // Создаем нового пользователя в БД.
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
        gender: candidate.sex === 1 ? 'female' : 'male', // 1 - женский, 2 - мужской.
        birthday: candidate.birthday,
        email: candidate.email,
      },
    },
    emailConfirm: true, // Пропускаем подтверждение email для регистрации через VK.
  });

  if (!userDB?._id) {
    throw new Error('Ошибка при создании пользователя в БД, модуль registrationVKIDService');
  }

  // Устанавливаем дату истечения токенов (7 дней).
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // Генерируем accessToken и refreshToken.
  const dataForClient: GenerateToken = {
    username: userDB.username,
    email: userDB.email,
    id: userDB._id,
    role: userDB.role,
    externalAccounts: {
      vk: userDB.externalAccounts?.vk,
    },
  };

  const tokensGenerated = generateToken(dataForClient);

  if (!tokensGenerated) {
    throw new Error('Ошибка при генерации пары JWT токенов!');
  }

  // Создаем запись токенов в БД.
  const tokenDB = await TokenAuthModel.create({
    userId: userDB._id,
    authService: 'vk',
    tokens: tokensGenerated,
    device,
    location,
    expiresAt,
  });

  if (!tokenDB) {
    throw new Error(
      'Ошибка при создании токенов для пользователя в БД, модуль registrationVKIDService'
    );
  }

  // Возвращаем данные для клиента.
  return {
    data: { user: dataForClient, tokens: tokensGenerated },
    message: 'Успешная регистрация!',
  };
}
