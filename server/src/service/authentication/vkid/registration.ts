// types
import { TResponseService, VkAuthResponse } from '../../../types/http.interface.js';
import { getUserProfileVkService } from './profile.js';

/**
 * Регистрация нового пользователя через VK ID.
 */
export async function registrationVKIDService({
  tokens,
}: {
  tokens: VkAuthResponse;
}): Promise<TResponseService<null>> {
  if (!tokens.access_token) {
    throw new Error('Не получен токен доступа, модуль registrationVKID');
  }

  // Запрос данных пользователя из VK API.
  const profile = await getUserProfileVkService({ accessToken: tokens.access_token });

  console.log(profile);

  return { data: null, message: 'Успешная регистрация!' };
}
