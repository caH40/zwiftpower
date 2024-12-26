import { Response } from 'express';

import { currentNameRefreshToken } from '../assets/constants.js';

type Params = {
  res: Response;
  refreshToken: string;
  maxAge: number;
};

/**
 * Установка куков для токена доступа авторизации.
 */
export function setRefreshTokenCookie({ res, refreshToken, maxAge }: Params) {
  res.cookie(currentNameRefreshToken, refreshToken, {
    maxAge,
    httpOnly: true,
    secure: true, // Secure только в production.
    // sameSite: 'strict', // Улучшает безопасность.
  });
}
