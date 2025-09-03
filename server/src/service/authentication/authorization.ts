import bcrypt from 'bcrypt';

import { User } from '../../Model/User.js';
import { generateAuthResponse } from './auth-response.js';

// types
import { TDeviceInfo, TLocationInfo, UserSchema } from '../../types/model.interface.js';
import { ResponseAuthService } from '../../types/auth.interface.js';
import { TResponseService } from '../../types/http.interface.js';

type Params = {
  username: string;
  password: string;
  device: TDeviceInfo;
  location?: TLocationInfo;
};

/**
 * Выполняет аутентификацию пользователя: проверяет логин и пароль, генерирует токены, обновляет или создает запись токенов в базе данных.
 *
 * @param params - Параметры для выполнения аутентификации.
 * @param params.username - Логин пользователя (нечувствительный к регистру).
 * @param params.password - Пароль пользователя.
 * @param params.device - Информация об устройстве, с которого выполняется аутентификация.
 * @param params.location - Информация о местоположении пользователя (опционально).
 *
 * @returns {Promise<TResponseService<ResponseAuthService>>} Возвращает объект с данными пользователя и токенами.
 */
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

  // Генерация токенов для пользователя, обновление/создание записи в базе данных, формирование необходимых данных о пользователе, отправляемых на клиент.
  const { dataForClient, tokensGenerated } = await generateAuthResponse({
    user: userDB,
    device,
    location,
    authService: 'credential',
  });

  // Возвращаем данные для клиента.
  return {
    data: { user: dataForClient, tokens: tokensGenerated },
    message: 'Успешная аутентификация!',
  };
}
