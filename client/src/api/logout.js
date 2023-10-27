import axios from 'axios';

import { serverExpress } from '../config/environment';

export async function postLogout() {
  try {
    const response = await axios({
      method: 'post',
      url: `${serverExpress}/api/auth/logout`,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
