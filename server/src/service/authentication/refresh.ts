import { generateToken, validateRefreshToken } from './token.js';

import { Token } from '../../Model/Token.js';
import { User } from '../../Model/User.js';
import { errorHandler } from '../../errors/error.js';

export async function refreshService(refreshToken: string) {
  try {
    if (!refreshToken) return;

    const userFromToken = validateRefreshToken(refreshToken);

    const tokenDb = await Token.findOne({ refreshToken });

    if (!userFromToken || !tokenDb) return;

    //обновляем данные пользователя если они изменились
    const userDB = await User.findById(userFromToken.id).lean();

    if (!userDB) {
      throw new Error(`Неверный Логин или Пароль`);
    }

    const tokens = await generateToken({
      id: userDB._id,
      zwiftId: userDB.zwiftId,
      email: userDB.email,
      username: userDB.username,
      role: userDB.role,
      moderator: userDB.moderator,
    });

    if (!tokens) {
      throw new Error('Ошибка при получении токенов');
    }

    return {
      accessToken: tokens.accessToken,
      user: {
        id: userDB._id,
        email: userDB.email,
        username: userDB.username,
        role: userDB.role,
        photoProfile: userDB.photoProfile || userDB.zwiftData?.imageSrc,
        zwiftId: userDB.zwiftId,
        moderator: userDB.moderator,
      },
    };
  } catch (error) {
    errorHandler(error);
  }
}
