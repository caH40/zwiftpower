import { Request, Response } from 'express';

import { validateAccessToken } from '../service/authentication/token.js';
import { errorHandler } from '../errors/error.js';

export async function checkAuth(req: Request, res: Response, next: () => void) {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Нет Authorization' });
    const accessToken = authorization?.split(' ')[1];

    const isValidAccessToken = validateAccessToken(accessToken);
    if (!isValidAccessToken)
      return res.status(401).json({ message: 'Неактуальный accessToken' });
    req.params.userId = isValidAccessToken?.id;

    return next();

    // const { refreshToken } = req.cookies;
    // if (!refreshToken) return res.status(401).json({ message: 'Необходима авторизация' });
    // const isValidRefreshToken = validateRefreshToken(refreshToken);
    // if (isValidRefreshToken) return next();
  } catch (error) {
    errorHandler(error);
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
    errorHandler(error);
    return next();
  }
}
