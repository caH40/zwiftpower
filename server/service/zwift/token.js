import axios from 'axios';
import qs from 'qs';
import { ZwiftToken } from '../../Model/ZwiftToken.js';

const secureUrl = process.env.ZWIFT_SECURE_URL;
const zwiftUsername = process.env.ZWIFT_USERNAME;
const zwiftPassword = process.env.ZWIFT_PASS;

export async function getAccessToken() {
  try {
    const { token } = await ZwiftToken.findOne({ username: zwiftUsername });
    if (!token) throw { message: 'Токен не найден!' };
    return token;
  } catch (error) {
    throw error;
  }
}
// создание общего токена доступа к Звифт и сохранение в БД
export async function updateAccessToken() {
  try {
    const data = {
      client_id: 'Zwift_Mobile_Link',
      username: zwiftUsername,
      password: zwiftPassword,
      grant_type: 'password',
    };

    const response = await axios.post(secureUrl, qs.stringify(data));
    const token = response.data.access_token;

    await ZwiftToken.findOneAndUpdate(
      { username: zwiftUsername },
      { $set: { token } },
      { upsert: true }
    );
  } catch (error) {
    throw error;
  }
}
