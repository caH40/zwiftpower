import { User as UserModel } from '../../../Model/User.js';
import { getUserProfileVkService } from './profile.js';
import { TokenAuthModel } from '../../../Model/TokenAuth.js';
import { generateToken } from '../token.js';

// types
import { TResponseService, VkAuthResponse } from '../../../types/http.interface.js';
import { TDeviceInfo, TLocationInfo } from '../../../types/model.interface.js';
import { GenerateToken, ResponseAuthService } from '../../../types/auth.interface.js';
import { Rider } from '../../../Model/Rider.js';
import { Organizer } from '../../../Model/Organizer.js';
import { ObjectId } from 'mongoose';

/**
 * Авторизация пользователя, прошедшего аутентификацию через VK ID.
 *
 * @param tokens - Токены, полученные от VK API.
 * @param device - Информация об устройстве пользователя.
 * @param location - (Необязательно) Данные о местоположении пользователя.
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

  // Получение данных организатора для генерации новой пары токенов.
  const organizerDB = await Organizer.findOne({ creator: userDB._id }, { _id: true }).lean<{
    _id: ObjectId;
  }>();

  // Получение лого райдера из коллекции Rider.
  const riderDB = await Rider.findOne(
    { zwiftId: userDB.zwiftId },
    { _id: false, imageSrc: true }
  ).lean<{ imageSrc: string | null }>();

  // Устанавливаем дату истечения токенов (7 дней) (время, через которое удалится документ с токенами из БД).
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // Генерируем accessToken и refreshToken.
  const dataForClient: GenerateToken = {
    username: userDB.username,
    email: userDB.email,
    id: userDB._id,
    role: userDB.role,
    photoProfile: riderDB?.imageSrc,
    zwiftId: userDB.zwiftId,
    externalAccounts: {
      vk: userDB.externalAccounts?.vk,
    },
    ...(organizerDB && { organizer: String(organizerDB._id) }),
  };

  const tokensGenerated = generateToken(dataForClient);

  if (!tokensGenerated) {
    throw new Error('Ошибка при генерации пары JWT токенов!');
  }

  // Обновляем или создаем запись токенов в БД для пользователя с соответствующим device.id
  await TokenAuthModel.findOneAndUpdate(
    { userId: userDB._id, 'device.deviceId': device.deviceId },
    {
      userId: userDB._id,
      authService: 'vk',
      tokens: tokensGenerated,
      device,
      location,
      expiresAt,
    },
    { upsert: true }
  );

  // Возвращаем данные для клиента.
  return {
    data: { user: dataForClient, tokens: tokensGenerated },
    message: 'Успешная регистрация!',
  };
}
