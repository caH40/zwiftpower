import axios from 'axios';

const server = import.meta.env.VITE_SERVER_EXPRESS;

export async function resetPassword(dataForm) {
  try {
    const response = await axios({
      method: 'put',
      url: `${server}/api/auth/reset-password`,
      data: { email: dataForm.email },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
