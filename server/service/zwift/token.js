import axios from 'axios';
import qs from 'qs';

const secureUrl = process.env.ZWIFT_SECURE_URL;

export async function getAccessToken(username, password) {
  try {
    const hasNewAccount = username && password;
    const zwiftUsername = hasNewAccount ? username : process.env.ZWIFT_USERNAME;
    const zwiftPassword = hasNewAccount ? password : process.env.ZWIFT_PASS;

    const data = {
      client_id: 'Zwift_Mobile_Link',
      username: zwiftUsername,
      password: zwiftPassword,
      grant_type: 'password',
    };

    const response = await axios.post(secureUrl, qs.stringify(data));

    return response.data.access_token;
  } catch (error) {
    throw error;
  }
}
