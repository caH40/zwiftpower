import axios from 'axios';

import { serverExpress } from '../config/environment';

export async function confirmEmail(token) {
  try {
    const response = await axios({
      method: 'put',
      url: `${serverExpress}/api/auth/confirm-email`,
      data: { token },
    });
    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
