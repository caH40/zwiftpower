import { myAxios } from './axios';

/**
 * Аутентификация пользователя через логин/пароль.
 */
export async function postAuthorization(dataForm) {
  try {
    const response = await myAxios({
      method: 'post',
      url: '/api/auth/authorization',
      data: { username: dataForm.username, password: dataForm.password },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}

/**
 * Аутентификация пользователя через сервис VK ID.
 */
export async function postAuthorizationVk({ tokens, device, location }) {
  try {
    const response = await myAxios({
      method: 'post',
      url: '/api/auth/authorization/vk',
      data: { tokens, device, location },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
