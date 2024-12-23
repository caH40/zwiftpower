import { Response } from 'express';

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
    secure: true, // Secure только в production.
    // sameSite: 'strict', // Улучшает безопасность.
  });
}
