import axios from 'axios';

import { serverExpress } from '../config/environment';

export async function checkAuth() {
  try {
    // запускается при первом запуске браузера, если refreshToken "живой" придет новый accessToken
    // и произойдет авторизация авторизация в браузере
    const response = await axios({
      method: 'post',
      url: `${serverExpress}/api/auth/refresh`,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
