import { Types } from 'mongoose';
import { User as UserModel } from '../../../Model/User.js';
import { getUserProfileVkService } from './profile.js';
import { generateTemporaryValue } from '../../../utils/temporaryValue.js';

// types
import { TResponseService, VkAuthResponse } from '../../../types/http.interface.js';
import { TDeviceInfo, TLocationInfo } from '../../../types/model.interface.js';
import { generateToken, saveAuthToken } from '../token.js';
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
      'Пользователь с таким VK ID уже зарегистрирован. Пройдите аутентификацию через страницу "Вход на сайт ZP"'
    );
  }

  // Создаем нового пользователя в БД.
  const {
    _id: userId,
    username,
    role,
    email,
    externalAccounts,
  } = await UserModel.create({
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

  // Данные для токенов и для возвращения клиент на клиент.
  const dataForClient: GenerateToken = {
    username,
    email,
    id: userId,
    role,
    externalAccounts,
  };

  // Генерация пары токенов: доступа и обновления.
  const tokensGenerated = generateToken(dataForClient);

  // Сохранения токенов и дополнительной информации об аутентификации в БД.
  await saveAuthToken({ userId, authService: 'vk', tokens: tokensGenerated, device, location });

  // Возвращаем данные для клиента.
  return {
    data: { user: dataForClient, tokens: tokensGenerated },
    message: 'Успешная регистрация!',
  };
}
