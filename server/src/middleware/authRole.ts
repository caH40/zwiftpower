import { Request, Response } from 'express';

import { validateAccessToken } from '../service/authentication/token.js';
import { handleAndLogError } from '../errors/error.js';

/**
 * Проверка, что является модератором клуба(ов) или админом сайта.
 */
export async function authModeratorClub(req: Request, res: Response, next: () => void) {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Нет Authorization' });
    const accessToken = authorization?.split(' ')[1];

    const isValidAccessToken = validateAccessToken(accessToken);

    const isModeratorClub = !!isValidAccessToken.moderator?.clubs?.length;

    if (!isValidAccessToken)
      return res.status(401).json({ message: 'Неактуальный accessToken' });

    // Если не модератор клуба или не админ, то отказ в доступе.
    if (!isModeratorClub && isValidAccessToken.role !== 'admin')
      return res.status(403).json({ message: 'Отказано в доступе' });

    req.params.userId = isValidAccessToken.id;

    return next();
  } catch (error) {
    handleAndLogError(error);
    return res.status(401).json({ message: 'Необходима авторизация' });
  }
}
/**
 * Проверка, что является Организатором заездов.
 */
export async function authOrganizer(req: Request, res: Response, next: () => void) {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Нет Authorization' });
    const accessToken = authorization?.split(' ')[1];

    const isValidAccessToken = validateAccessToken(accessToken);

    const isOrganizer = !!isValidAccessToken.moderator;

    if (!isValidAccessToken)
      return res.status(401).json({ message: 'Неактуальный accessToken' });

    // Если не модератор клуба или не админ, то отказ в доступе.
    if (!isOrganizer && isValidAccessToken.role !== 'admin')
      return res.status(403).json({ message: 'Отказано в доступе' });

    req.params.userId = isValidAccessToken.id;

    return next();
  } catch (error) {
    handleAndLogError(error);
    return res.status(401).json({ message: 'Необходима авторизация' });
  }
}

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
    handleAndLogError(error);
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
    handleAndLogError(error);
    return res.status(401).json({ message: 'Необходима авторизация' });
  }
}
