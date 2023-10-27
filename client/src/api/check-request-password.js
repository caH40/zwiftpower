import axios from 'axios';

import { serverExpress } from '../config/environment';

export async function checkRequestPassword(token) {
  try {
    const response = await axios({
      method: 'get',
      url: `${serverExpress}/api/auth/check-request-password/${token}`,
    });
    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
