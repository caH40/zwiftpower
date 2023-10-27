import axios from 'axios';

import { serverExpress } from '../config/environment';

export async function resetPassword(dataForm) {
  try {
    const response = await axios({
      method: 'put',
      url: `${serverExpress}/api/auth/reset-password`,
      data: { email: dataForm.email },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
