import { ObjectId } from 'mongoose';

import { TokenAuthModel } from '../../Model/TokenAuth.js';
import { User } from '../../Model/User.js';
import { Rider } from '../../Model/Rider.js';
import { handleAndLogError } from '../../errors/error.js';
import { generateToken, validateRefreshToken } from './token.js';
import { Organizer } from '../../Model/Organizer.js';

// types
import { GenerateToken } from '../../types/auth.interface.js';

/**
 * Обновление токена доступа и данных пользователя.
 * 1. Проверка refreshToken на валидность.
 * 2. Проверка refreshToken что он есть в БД и не был отозван (удалён).
 * 3. Получение данных пользователя из БД на случай, если они изменились со времени создания предыдущего accessToken.
 * 4. Получение данных Организатора, если пользователь является Организатором.
 * 5. Генерация токенов.
 * 6. Возвращение в контроллер нового сгенерированного токена доступа и данных об пользователе.
 */
export async function refreshService(refreshToken: string) {
  try {
    if (!refreshToken) {
      return;
    }

    // Проверка валидности токена.
    const userFromToken = validateRefreshToken(refreshToken);
    if (!userFromToken) {
      throw new Error(
        'Недействительный refresh-токен: токен истёк или имеет некорректный формат.'
      );
    }

    // Проверка, что токен не был аннулирован вручную (по запросу пользователя или при аномальных попытках входа в учетную запись).
    const tokenDb = await TokenAuthModel.findOne({ refreshToken });

    if (!tokenDb) {
      throw new Error('Refresh-токен не найден в базе данных или был отозван.');
    }

    // Проверяем на соответствие userId в токене и в БД.
    const userDB = await User.findById(userFromToken.id).lean();

    if (!userDB) {
      throw new Error(`Неверный Логин или Пароль`);
    }

    // Получение данных организатора для генерации новой пары токенов.
    const organizerDB = await Organizer.findOne({ creator: userDB._id }, { _id: true }).lean<{
      _id: ObjectId;
    }>();

    // Получение лого райдера из коллекции Rider.
    const riderDB = await Rider.findOne(
      { zwiftId: userDB.zwiftId },
      { _id: false, imageSrc: true }
    ).lean<{ imageSrc: string | null }>();

    // Данные для новой пары токенов.
    const dataForClient: GenerateToken = {
      id: userDB._id,
      username: userDB.username,
      email: userDB.email,
      role: userDB.role,
      externalAccounts: {
        ...(userDB.externalAccounts?.vk && { vk: userDB.externalAccounts?.vk }),
      },
      zwiftId: userDB.zwiftId,
      moderator: userDB.moderator,
      ...(organizerDB && { organizer: organizerDB._id }),
    };

    // Генерация новой пары токенов.
    const { accessToken } = generateToken(dataForClient);

    return {
      accessToken,
      user: { ...dataForClient, photoProfile: riderDB?.imageSrc },
    };
  } catch (error) {
    handleAndLogError(error);
  }
}
