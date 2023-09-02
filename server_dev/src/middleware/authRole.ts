import { Request, Response } from 'express';
import { validateAccessToken } from '../service/authentication/token.js';

export async function authModerator(req: Request, res: Response, next: () => void) {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Нет Authorization' });
    const accessToken = authorization?.split(' ')[1];

    const isValidAccessToken = validateAccessToken(accessToken);
    if (!isValidAccessToken)
      return res.status(401).json({ message: 'Неактуальный accessToken' });

    if (isValidAccessToken.role !== 'moderator' && isValidAccessToken.role !== 'admin')
      return res.status(403).json({ message: 'Отказано в доступе' });

    req.params.userId = isValidAccessToken.id;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Необходима авторизация' });
  }
}

export async function authAdmin(req: Request, res: Response, next: () => void) {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Нет Authorization' });
    const accessToken = authorization?.split(' ')[1];

    const isValidAccessToken = validateAccessToken(accessToken);
    if (!isValidAccessToken)
      return res.status(401).json({ message: 'Неактуальный accessToken' });

    if (isValidAccessToken.role !== 'admin')
      return res.status(403).json({ message: 'Отказано в доступе' });

    req.params.userId = isValidAccessToken.id;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Необходима авторизация' });
  }
}
