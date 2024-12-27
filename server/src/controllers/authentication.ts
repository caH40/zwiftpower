import { Request, Response } from 'express';

import { authorizationService } from '../service/authentication/authorization.js';
import { logoutService } from '../service/authentication/logout.js';
import { registrationService } from '../service/authentication/registration.js';
import { validateAccessToken } from '../service/authentication/token.js';
import { refreshService } from '../service/authentication/refresh.js';
import { confirmEmailService } from '../service/authentication/confirm-email.js';
import { resetPasswordService } from '../service/authentication/reset-password.js';
import { checkRequestPasswordService } from '../service/authentication/checkRequestPassword.js';
import { newPasswordService } from '../service/authentication/new-password.js';
import { handleAndLogError, handleErrorInController } from '../errors/error.js';
import { registrationVKIDService } from '../service/authentication/vkid/registration.js';
import { setRefreshTokenCookie } from '../utils/cookie.js';
import { authorizationVKIDService } from '../service/authentication/vkid/authorization.js';
import { currentNameRefreshToken } from '../assets/constants.js';
import { millisecondsInWeekDays } from '../assets/date.js';

// types
import { VkAuthResponse } from '../types/http.interface.js';
import { TDeviceInfo, TLocationInfo } from '../types/model.interface.js';
import { linkVKIDService } from '../service/authentication/vkid/link.js';

/**
 * Контроллер регистрации нового пользователя через логин/пароль.
 */
export async function registration(req: Request, res: Response) {
  try {
    const { username, email, password, device, location } = req.body;

    // !!! проверять на все разрешенные символы
    if (!username) {
      return res.status(400).json({ message: 'Не получен username!' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Не получен email!' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Не получен password!' });
    }
    if (username.includes(' ')) {
      return res.status(400).json({ message: 'В логине не должно быть пробелов!' });
    }
    if (!device?.deviceId) {
      return res.status(400).json({ message: 'Не получен deviceId!' });
    }

    const { data, message } = await registrationService({
      username,
      email,
      password,
      device,
      location,
    });

    // Установка токена доступа в куки.
    setRefreshTokenCookie({
      res,
      refreshToken: data.tokens.refreshToken,
      maxAge: millisecondsInWeekDays,
    });

    res.status(201).json({ message, data: data.user });
  } catch (error) {
    handleErrorInController(res, error);
  }
}

/**
 * Аутентификация через логин/пароль.
 */
export async function authorization(req: Request, res: Response) {
  try {
    const { username, password, device, location } = req.body;

    // !!! проверять на все разрешенные символы
    if (!username) {
      return res.status(400).json({ message: 'Не получен username!' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Не получен password!' });
    }
    if (username.includes(' ')) {
      return res.status(400).json({ message: 'В логине не должно быть пробелов!' });
    }
    if (!device?.deviceId) {
      return res.status(400).json({ message: 'Не получен deviceId!' });
    }

    const {
      data: { user, tokens },
      message,
    } = await authorizationService({
      username,
      password,
      device,
      location,
    });

    // Установка токена доступа в куки.
    setRefreshTokenCookie({
      res,
      refreshToken: tokens.refreshToken,
      maxAge: millisecondsInWeekDays,
    });

    res.status(201).json({ message, data: { user, accessToken: tokens.accessToken } });
  } catch (error) {
    handleErrorInController(res, error);
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const { cookies } = req;

    const token = await logoutService(cookies[currentNameRefreshToken]);

    // Очистка куков для токена обновления.
    res.clearCookie(currentNameRefreshToken);

    res.status(201).json({ ...token });
  } catch (error) {
    handleAndLogError(error);
    res.status(400).json('Непредвиденная ошибка');
  }
}

/**
 * Запрос на обновление ключа доступа и данных пользователя для клиента.
 */
export async function refresh(req: Request, res: Response) {
  try {
    const { cookies } = req;

    const responseFromService = await refreshService(cookies[currentNameRefreshToken]);

    if (!responseFromService) {
      // success для дополнительной проверки на клиенте при получении ответа от этого запроса.
      // Так как отправляется статус код 200 на ошибку!
      // Реализовано для исключения отображения этой ошибки если пользователь не авторизован.
      return res.status(200).json({ success: false, message: 'Не авторизован' });
    }

    res.status(201).json({ success: true, ...responseFromService });
  } catch (error) {
    handleErrorInController(res, error);
  }
}

export async function checkAuth(req: Request, res: Response) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error('Не получен ключ авторизации');
    }

    const accessToken = authorization.split(' ')[1];
    const user = validateAccessToken(accessToken);

    if (!user) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    res.status(201).json({ user });
  } catch (error) {
    handleAndLogError(error);
    res.status(400).json({ message: 'Непредвиденная ошибка' });
  }
}
export async function confirmEmail(req: Request, res: Response) {
  try {
    const { token } = req.body;
    const response = await confirmEmailService(token);
    res.status(200).json(response);
  } catch (error) {
    handleAndLogError(error);
    res.status(400).json({ message: 'Непредвиденная ошибка' });
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const response = await resetPasswordService(email);
    res.status(200).json(response);
  } catch (error) {
    handleAndLogError(error);
    res.status(400).json(error);
  }
}

export async function checkRequestPassword(req: Request, res: Response) {
  try {
    const { token } = req.params;
    const response = await checkRequestPasswordService(token);
    res.status(200).json(response);
  } catch (error) {
    handleAndLogError(error);
    res.status(400).json(error);
  }
}

export async function newPassword(req: Request, res: Response) {
  try {
    const { userId, newPassword } = req.body;

    const response = await newPasswordService(userId, newPassword);
    res.status(201).json(response);
  } catch (error) {
    handleAndLogError(error);
    res.status(400).json(error);
  }
}

/**
 * Контроллер для регистрации нового пользователя через VK ID.
 */
export async function registrationVKID(req: Request, res: Response) {
  try {
    const {
      tokens,
      device,
      location,
    }: {
      tokens: VkAuthResponse;
      device: TDeviceInfo;
      location?: TLocationInfo;
    } = req.body;

    if (!tokens?.access_token || !tokens.refresh_token) {
      return res.status(400).json({ message: 'Не получены токены доступа и(или) обновления' });
    }
    if (!device?.deviceId) {
      return res.status(400).json({ message: 'Не получен deviceId' });
    }

    const {
      data: { user, tokens: tokensGenerated },
      message,
    } = await registrationVKIDService({ tokens, device, location });

    // Установка токена доступа в куки.
    setRefreshTokenCookie({
      res,
      refreshToken: tokensGenerated.refreshToken,
      maxAge: millisecondsInWeekDays,
    });

    res.status(201).json({ message, data: { user, accessToken: tokensGenerated.accessToken } });
  } catch (error) {
    handleErrorInController(res, error);
  }
}

/**
 * Контроллер для авторизации пользователя, прошедшего аутентификацию через VK ID.
 */
export async function authorizationVKID(req: Request, res: Response) {
  try {
    const {
      tokens,
      device,
      location,
    }: {
      tokens: VkAuthResponse;
      device: TDeviceInfo;
      location?: TLocationInfo;
    } = req.body;

    if (!tokens?.access_token || !tokens.refresh_token) {
      return res.status(400).json({ message: 'Не получены токены доступа и(или) обновления' });
    }
    if (!device?.deviceId) {
      return res.status(400).json({ message: 'Не получен deviceId' });
    }

    const {
      data: { user, tokens: tokensGenerated },
      message,
    } = await authorizationVKIDService({ tokens, device, location });

    // Установка токена доступа в куки.
    setRefreshTokenCookie({
      res,
      refreshToken: tokensGenerated.refreshToken,
      maxAge: millisecondsInWeekDays,
    });

    res.status(201).json({ message, data: { user, accessToken: tokensGenerated.accessToken } });
  } catch (error) {
    handleErrorInController(res, error);
  }
}

/**
 *  Привязка аккаунта VK ID к текущему пользователю.
 */
export async function linkVKID(req: Request, res: Response) {
  try {
    const { tokens }: { tokens: VkAuthResponse } = req.body;

    const { userId } = req.params;

    if (!tokens?.access_token || !tokens.refresh_token) {
      return res.status(400).json({ message: 'Не получены токены доступа и(или) обновления' });
    }

    const {
      data: { user },
      message,
    } = await linkVKIDService({ tokens, userId });

    res.status(201).json({ message, data: { user } });
  } catch (error) {
    handleErrorInController(res, error);
  }
}
