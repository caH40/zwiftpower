import { Types } from 'mongoose';
import bcrypt from 'bcrypt';

import { User } from '../../Model/User.js';
import { generateToken } from './token.js';
import { TDeviceInfo, TLocationInfo, UserSchema } from '../../types/model.interface.js';
import { Rider } from '../../Model/Rider.js';
import { Organizer } from '../../Model/Organizer.js';
import { GenerateToken, ResponseAuthService } from '../../types/auth.interface.js';
import { TokenAuthModel } from '../../Model/TokenAuth.js';
import { TResponseService } from '../../types/http.interface.js';

type Params = {
  username: string;
  password: string;
  device: TDeviceInfo;
  location?: TLocationInfo;
};

export async function authorizationService({
  username,
  password,
  device,
  location,
}: Params): Promise<TResponseService<ResponseAuthService>> {
  // Поиск пользователя с таким username, игнорируя регистр символов.
  const userDB = await User.findOne({
    username: { $regex: '\\b' + username + '\\b', $options: 'i' },
  }).lean<UserSchema>();
  if (!userDB || !userDB._id) {
    throw new Error(`Неверный Логин или Пароль`);
  }

  // Проверка пароля пользователя, который проходит аутентификацию.
  const isValidPassword = await bcrypt.compare(password, userDB.password);
  if (!isValidPassword) {
    throw new Error(`Неверный Логин или Пароль`);
  }

  // Получение данных организатора, ели пользователь является организатором.
  const organizerDB = await Organizer.findOne({ creator: userDB._id }, { _id: true }).lean<{
    _id: Types.ObjectId;
  }>();

  // Получение лого райдера из коллекции Rider.
  const riderDB = await Rider.findOne(
    { zwiftId: userDB.zwiftId },
    { _id: false, imageSrc: true }
  ).lean<{ imageSrc: string | null }>();

  // Данные для токенов и для возвращения клиент на клиент.
  const dataForClient: GenerateToken = {
    username: userDB.username,
    email: userDB.email,
    id: userDB._id,
    role: userDB.role,
    photoProfile: riderDB?.imageSrc,
    zwiftId: userDB.zwiftId,
    externalAccounts: userDB.externalAccounts,
    ...(organizerDB && { organizer: String(organizerDB._id) }),
  };

  // Генерируем accessToken и refreshToken.
  const tokensGenerated = generateToken(dataForClient);

  if (!tokensGenerated) {
    throw new Error('Ошибка при генерации пары JWT токенов!');
  }

  // Устанавливаем дату истечения токенов (7 дней) (время, через которое удалится документ с токенами из БД).
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // Обновляем или создаем запись токенов в БД для пользователя с соответствующим device.id
  await TokenAuthModel.findOneAndUpdate(
    { userId: userDB._id, 'device.deviceId': device.deviceId, authService: 'credential' },
    {
      userId: userDB._id,
      authService: 'credential',
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
    message: 'Успешная аутентификация!',
  };
}
