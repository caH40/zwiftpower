import { Request, Response } from 'express';

import { validateAccessToken } from '../service/authentication/token.js';
import { handleAndLogError } from '../errors/error.js';

/**
 * Проверка токена в запросе.
 */
export async function checkAuth(req: Request, res: Response, next: () => void) {
  try {
    const { authorization } = req.headers;

    // Проверка наличия Authorization
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Нет Authorization или неправильный формат' });
    }

    const accessToken = authorization.split(' ')[1];

    // Проверка наличия токена после Bearer
    if (!accessToken || accessToken === 'null') {
      return res.status(401).json({ message: 'Токен отсутствует или равен null' });
    }

    const isValidAccessToken = validateAccessToken(accessToken);

    if (!isValidAccessToken) {
      return res.status(401).json({ message: 'Неактуальный accessToken' });
    }

    // Добавление данных из токена в params запроса.
    req.params.userId = isValidAccessToken.id;
    req.params.userZwiftId = isValidAccessToken.zwiftId;

    req.user = {
      id: isValidAccessToken.id,
      zwiftId: isValidAccessToken.zwiftId,
      role: isValidAccessToken.role,
    };

    return next();
  } catch (error) {
    handleAndLogError(error);
    return res.status(401).json({ message: 'Необходима авторизация' });
  }
}

export async function getAuth(req: Request, res: Response, next: () => void) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error('Не получены данные авторизации из headers.authorization');
    }
    const accessToken = authorization?.split(' ')[1];
    const isValidAccessToken = validateAccessToken(accessToken);
    req.params.userId = isValidAccessToken?.id;
    return next();
  } catch (error) {
    handleAndLogError(error);
    return next();
  }
}
