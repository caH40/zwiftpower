import { ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';

import { User } from '../../Model/User.js';
import { generateToken, removeToken, saveToken } from './token.js';
import { UserSchema } from '../../types/model.interface.js';
import { Rider } from '../../Model/Rider.js';
import { Organizer } from '../../Model/Organizer.js';

export async function authorizationService(
  username: string,
  password: string,
  refreshToken: string
) {
  const userDB = await User.findOne({
    username: { $regex: '\\b' + username + '\\b', $options: 'i' },
  }).lean<UserSchema>();

  if (!userDB || !userDB._id) {
    throw new Error(`Неверный Логин или Пароль`);
  }

  const organizerDB = await Organizer.findOne({ creator: userDB._id }, { _id: true }).lean<{
    _id: ObjectId;
  }>();

  const isValidPassword = await bcrypt.compare(password, userDB.password);

  if (!isValidPassword) {
    throw new Error(`Неверный Логин или Пароль`);
  }

  // Получение лого райдера из коллекции Rider.
  const riderDB = await Rider.findOne(
    { zwiftId: userDB.zwiftId },
    { _id: false, imageSrc: true }
  ).lean<{ imageSrc: string | null }>();

  await removeToken(refreshToken);

  const tokens = generateToken({
    username,
    email: userDB.email,
    id: userDB._id,
    zwiftId: userDB.zwiftId,
    role: userDB.role,
    moderator: userDB.moderator,
    ...(organizerDB && { organizer: organizerDB._id }),
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
      photoProfile: riderDB?.imageSrc,
      zwiftId: userDB.zwiftId,
      moderator: userDB.moderator,
      ...(organizerDB && { organizer: organizerDB._id }),
    },
  };
}
