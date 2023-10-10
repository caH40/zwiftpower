import bcrypt from 'bcrypt';

import { User } from '../../Model/User.js';
import { generateToken, removeToken, saveToken } from './token.js';
import { errorHandler } from '../../errors/error.js';

export async function authorizationService(
  username: string,
  password: string,
  refreshToken: string
) {
  try {
    const userDB = await User.findOne({ username });

    const wrongAuth = { message: `Неверный Логин или Пароль`, status: 'wrong' };
    if (!userDB) {
      throw wrongAuth;
    }

    const isValidPassword = await bcrypt.compare(password, userDB.password);
    if (!isValidPassword) {
      throw wrongAuth;
    }

    await removeToken(refreshToken);

    const tokens = await generateToken({
      username,
      email: userDB.email,
      id: userDB._id,
      zwiftId: userDB.zwiftId,
      role: userDB.role,
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
        photoProfile: userDB.photoProfile,
        zwiftId: userDB.zwiftId,
      },
    };
  } catch (error) {
    errorHandler(error);
  }
}
