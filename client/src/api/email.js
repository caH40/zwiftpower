import axios from 'axios';
const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export async function confirmEmail(token) {
  try {
    const response = await axios({
      method: 'put',
      url: `${serverExpress}/api/auth/confirm-email`,
      data: { token },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
