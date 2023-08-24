import axios from 'axios';
const serverExpress = import.meta.env.VITE_SERVER_EXPRESS;

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
