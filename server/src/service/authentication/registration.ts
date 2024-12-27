import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { UserConfirm } from '../../Model/User-confirm.js';
import { User } from '../../Model/User.js';
import { mailService } from './nodemailer.js';
import { generateToken, saveAuthToken } from './token.js';

// types
import { TDeviceInfo, TLocationInfo } from '../../types/model.interface.js';
import { GenerateToken } from '../../types/auth.interface.js';

type Params = {
  username: string;
  email: string;
  password: string;
  device: TDeviceInfo;
  location?: TLocationInfo;
};
/**
 * Регистрация нового пользователя
 */
export async function registrationService({
  username,
  email,
  password,
  device,
  location,
}: Params) {
  // Проверка пользователя с таким username, игнорируя регистр символов.
  const checkUsername = await User.findOne({
    username: { $regex: '\\b' + username + '\\b', $options: 'i' },
  });
  if (checkUsername) {
    throw new Error('Данный username уже используется другим пользователем!');
  }

  // Проверка уникальности e-mail.
  const checkEmail = await User.findOne({
    email: { $regex: '\\b' + email + '\\b', $options: 'i' },
  });
  if (checkEmail) {
    throw new Error('Данный email уже используется другим пользователем!');
  }

  // Хеширование пароля перед сохранением в БД.
  const hashPassword = await bcrypt.hash(password, 10);

  const { _id: userId, role } = await User.create({
    username,
    email,
    password: hashPassword,
    role: 'user',
    date: Date.now(),
  });

  // Уникальный token для сервиса активации аккаунта через почту.
  const activationToken = uuidv4();

  // Создание документа для контроля подтверждения e-mail при регистрации.
  await UserConfirm.create({
    userId: userId,
    date: Date.now(),
    activationToken,
    email,
  });

  // Отправка письма зарегистрировавшемуся пользователю, для активации (подтверждения e-mail)
  const target = 'registration'; //для отправки письма для активации
  await mailService(target, activationToken, email, username, password);

  // Данные для токенов и для возвращения клиент на клиент.
  const dataForClient: GenerateToken = {
    username,
    email,
    id: userId,
    role,
  };

  // Генерация пары токенов: доступа и обновления.
  const tokensGenerated = generateToken(dataForClient);

  // Сохранения токенов и дополнительной информации об аутентификации в БД.
  await saveAuthToken({
    userId,
    authService: 'credential',
    tokens: tokensGenerated,
    device,
    location,
  });

  // Возвращаем данные для клиента.
  return {
    data: { user: dataForClient, tokens: tokensGenerated },
    message: 'Успешная регистрация!',
  };
}
