import bcrypt from 'bcrypt';

import { User } from '../../Model/User.js';
import { generateToken, removeToken, saveToken } from './token.js';

export async function authorizationService(
  username: string,
  password: string,
  refreshToken: string
) {
  const userDB = await User.findOne({
    username: { $regex: '\\b' + username + '\\b', $options: 'i' },
  })
    .populate({ path: 'moderator.clubs', select: ['id'] })
    .lean();

  if (!userDB) {
    throw new Error(`Неверный Логин или Пароль`);
  }

  // формирование массива клубов в которых Пользователь является модератором
  const clubs = userDB.moderator?.clubs.map((club) => club.id) as string[] | undefined;
  const moderator = clubs ? { clubs: clubs } : undefined;

  const isValidPassword = await bcrypt.compare(password, userDB.password);

  if (!isValidPassword) {
    throw new Error(`Неверный Логин или Пароль`);
  }

  await removeToken(refreshToken);

  const tokens = await generateToken({
    username,
    email: userDB.email,
    id: userDB._id,
    zwiftId: userDB.zwiftId,
    role: userDB.role,
    moderator,
  });

  if (tokens) {
    await saveToken(userDB._id, tokens.refreshToken);
  } else {
    throw new Error('Ошибка при получении токенов');
  }

  const message = 'Авторизация прошла успешно';
  return {
    ...tokens,
    message,
    user: {
      username,
      email: userDB.email,
      id: userDB._id,
      role: userDB.role,
      photoProfile: userDB.photoProfile || userDB.zwiftData?.imageSrc,
      zwiftId: userDB.zwiftId,
      moderator,
    },
  };
}
