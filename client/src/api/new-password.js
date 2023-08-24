import axios from 'axios';

const server = import.meta.env.VITE_SERVER_EXPRESS;

export async function putNewPassword(dataForm, userId) {
  try {
    const response = await axios({
      method: 'put',
      url: `${server}/api/auth/new-password`,
      data: { userId, newPassword: dataForm.password },
    });
    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
