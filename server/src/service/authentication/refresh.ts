import { ObjectId } from 'mongoose';

import { generateToken, validateRefreshToken } from './token.js';
import { Token } from '../../Model/Token.js';
import { User } from '../../Model/User.js';
import { errorHandler } from '../../errors/error.js';
import { Rider } from '../../Model/Rider.js';
import { Organizer } from '../../Model/Organizer.js';

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

    const organizerDB = await Organizer.findOne({ creator: userDB._id }, { _id: true }).lean<{
      _id: ObjectId;
    }>();

    // Получение лого райдера из коллекции Rider.
    const riderDB = await Rider.findOne(
      { zwiftId: userDB.zwiftId },
      { _id: false, imageSrc: true }
    ).lean<{ imageSrc: string | null }>();

    const tokens = await generateToken({
      id: userDB._id,
      zwiftId: userDB.zwiftId,
      email: userDB.email,
      username: userDB.username,
      role: userDB.role,
      moderator: userDB.moderator,
      ...(organizerDB && { organizer: organizerDB._id }),
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
        photoProfile: riderDB?.imageSrc,
        zwiftId: userDB.zwiftId,
        moderator: userDB.moderator,
        ...(organizerDB && { organizer: organizerDB._id }),
      },
    };
  } catch (error) {
    errorHandler(error);
  }
}
