import axios from 'axios';

import { serverExpress } from '../config/environment';

export async function postRegistration(dataForm) {
  try {
    const response = await axios({
      method: 'post',
      url: `${serverExpress}/api/auth/registration`,
      data: { username: dataForm.username, email: dataForm.email, password: dataForm.password },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}

/**
 * Регистрация пользователя через сервис VK ID.
 */
export async function postRegistrationVk(tokens) {
  try {
    const response = await axios({
      method: 'post',
      url: `${serverExpress}/api/auth/registration/vk`,
      data: { tokens },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
