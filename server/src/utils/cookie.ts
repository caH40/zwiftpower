import { Response } from 'express';

import { nodeEnvType } from '../config/environment.js';

type Params = {
  res: Response;
  refreshToken: string;
  maxAge: number;
};

/**
 * Установка куков для токена доступа авторизации.
 */
export function setAccessTokenCookie({ res, refreshToken, maxAge }: Params) {
  res.cookie('refreshToken', refreshToken, {
    maxAge,
    httpOnly: true,
    secure: nodeEnvType !== 'development', // Secure только в production.
    // sameSite: 'strict', // Улучшает безопасность.
  });
}
