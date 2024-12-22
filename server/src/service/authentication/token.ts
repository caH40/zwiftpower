import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { TokenAuthModel } from '../../Model/TokenAuth.js';
import { jwtAccessSecret, jwtRefreshSecret } from '../../config/environment.js';
import { handleAndLogError } from '../../errors/error.js';

// types
import { GenerateToken } from '../../types/auth.interface.js';

/**
 * Генерация пары токенов (accessToken и refreshToken).
 * @param payload - Данные, которые будут включены в токены.
 * @returns Объект с `accessToken` и `refreshToken`, если генерация успешна.
 */
export function generateToken(
  payload: GenerateToken
): { accessToken: string; refreshToken: string } | undefined {
  try {
    // Создание access-токена с периодом действия 1 день.
    const accessToken = jwt.sign(payload, jwtAccessSecret, { expiresIn: '1d' });

    // Создание refresh-токена с периодом действия 30 дней.
    const refreshToken = jwt.sign(payload, jwtRefreshSecret, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  } catch (error) {
    // Обработка и логирование ошибки с помощью вспомогательной функции.
    handleAndLogError(error);
  }
}

export async function saveToken(userId: Types.ObjectId, refreshToken: string) {
  try {
    const tokenDB = await TokenAuthModel.findOne({ user: userId });
    if (tokenDB) {
      tokenDB.tokens.refreshToken = refreshToken;
      return await tokenDB.save(); //вернётся ли тут сохранённое значение??
    }

    const newTokenDB = await TokenAuthModel.create({ user: userId, refreshToken });
    return newTokenDB;
  } catch (error) {
    handleAndLogError(error);
  }
}

export async function removeToken(refreshToken: string) {
  try {
    const tokenDB = await TokenAuthModel.findOneAndDelete({ refreshToken });
    return tokenDB;
  } catch (error) {
    handleAndLogError(error);
  }
}

export function validateAccessToken(token: string) {
  const userData = jwt.verify(token, jwtAccessSecret);
  if (typeof userData === 'string') {
    throw new Error('ошибка при проверке токена');
  }
  return userData;
}

export function validateRefreshToken(token: string) {
  const userData = jwt.verify(token, jwtRefreshSecret);
  if (typeof userData === 'string') {
    throw new Error('ошибка при проверке токена');
  }

  return userData;
}
