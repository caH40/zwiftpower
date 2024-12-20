import { Response } from 'express';

import { nodeEnvType } from '../config/environment.js';
import { AuthType } from '../types/types.interface.js';

type Params = {
  res: Response;
  accessToken: {
    authType: AuthType;
    accessToken: string;
  };
  maxAge: number;
};

/**
 * Установка куков для токена доступа авторизации.
 */
export function setAccessTokenCookie({ res, accessToken, maxAge }: Params) {
  res.cookie('accessToken', JSON.stringify(accessToken), {
    maxAge,
    httpOnly: true,
    secure: nodeEnvType !== 'development', // Secure только в production.
    // sameSite: 'strict', // Улучшает безопасность.
  });
}
