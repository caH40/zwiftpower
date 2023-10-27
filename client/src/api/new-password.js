import axios from 'axios';

import { serverExpress } from '../config/environment';

export async function putNewPassword(dataForm, userId) {
  try {
    const response = await axios({
      method: 'put',
      url: `${serverExpress}/api/auth/new-password`,
      data: { userId, newPassword: dataForm.password },
    });
    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
