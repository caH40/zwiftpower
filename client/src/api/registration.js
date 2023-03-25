import axios from 'axios';

const serverExpress = process.env.REACT_APP_SERVER_EXPRESS;

export async function postRegistration(dataForm) {
  try {
    const response = await axios({
      method: 'post',
      url: `${serverExpress}/api/auth/registration`,
      data: { username: dataForm.username, email: dataForm.email, password: dataForm.password },
    });

    return response;
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error;
  }
}
