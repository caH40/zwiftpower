import { generateToken, validateRefreshToken } from './token.js';

import { Token } from '../../Model/Token.js';
import { User } from '../../Model/User.js';

export async function refreshService(refreshToken: string) {
  try {
    if (!refreshToken) return;

    const userFromToken = validateRefreshToken(refreshToken);

    const tokenDb = await Token.findOne({ refreshToken });

    if (!userFromToken || !tokenDb) return;

    //обновляем данные пользователя если они изменились
    const userDB = await User.findById(userFromToken.id);
    if (!userDB) return;
    const tokens = await generateToken({
      id: userDB._id,
      zwiftId: userDB.zwiftId,
      email: userDB.email,
      username: userDB.username,
      role: userDB.role,
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
        photoProfile: userDB.photoProfile,
        zwiftId: userDB.zwiftId,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
