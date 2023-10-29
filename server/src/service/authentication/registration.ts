import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { UserConfirm } from '../../Model/User-confirm.js';
import { User } from '../../Model/User.js';
import { mailService } from './nodemailer.js';
import { generateToken, saveToken } from './token.js';

/**
 * Регистрация нового пользователя
 */
export async function registrationService(username: string, email: string, password: string) {
  // !!! проверять на все разрешенные символы
  if (username.includes(' ')) {
    throw new Error('В логине не должно быть пробелов');
  }

  const checkUsername = await User.findOne({
    username: { $regex: '\\b' + username + '\\b', $options: 'i' },
  });

  // проверка уникальности Логина
  if (checkUsername) {
    throw new Error(`Username "${username}" уже занят`);
  }

  // проверка уникальности e-mail
  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    throw new Error(`Пользователь с "${email}" уже существует`);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const activationToken = uuidv4();
  const { _id: id, role } = await User.create({
    username,
    email,
    password: hashPassword,
    role: 'user',
    date: Date.now(),
  });

  // создание документа для контроля подтверждения e-mail при регистрации
  await UserConfirm.create({
    userId: id,
    date: Date.now(),
    activationToken,
    email,
  });

  // отправка письма зарегистрировавшемуся пользователю, для активации (подтверждения e-mail)
  const target = 'registration'; //для отправки письма для активации
  await mailService(target, activationToken, email, username, password);

  const tokens = await generateToken({ username, email, id, role });

  if (!tokens) {
    throw new Error('Ошибка при получении токенов');
  }

  await saveToken(id, tokens.refreshToken);

  const message = 'Регистрация прошла успешно';
  return { ...tokens, message, user: { username, email, id, role } };
}
