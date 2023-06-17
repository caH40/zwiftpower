import axios from 'axios';
import qs from 'qs';
import { ZwiftToken } from '../../Model/ZwiftToken.js';

const secureUrl = process.env.ZWIFT_SECURE_URL;
const zwiftUsers = [
  {
    username: process.env.ZWIFT_USERNAME,
    password: process.env.ZWIFT_PASS,
    importance: 'main',
  },
  {
    username: process.env.ZWIFT_USERNAME_SECONDARY,
    password: process.env.ZWIFT_PASS_SECONDARY,
    importance: 'secondary',
  },
];

export async function getAccessToken(isMainToken) {
  try {
    const importance = isMainToken ? 'main' : 'secondary';
    const username = isMainToken ? zwiftUsers[0].username : zwiftUsers[1].username;

    const { token } = await ZwiftToken.findOne({ username, importance });

    if (!token) throw { message: 'Токен не найден!' };
    return token;
  } catch (error) {
    throw error;
  }
}
// создание общего токена доступа к Звифт и сохранение в БД
export async function updateAccessToken() {
  try {
    for (const user of zwiftUsers) {
      const data = {
        client_id: 'Zwift_Mobile_Link',
        username: user.username,
        password: user.password,
        grant_type: 'password',
      };

      const response = await axios.post(secureUrl, qs.stringify(data)).catch((error) => {
        errorAxios(error, 'updateAccessToken');
      });
      const token = response.data.access_token;

      await ZwiftToken.findOneAndUpdate(
        { username: user.username },
        { importance: user.importance },
        { $set: { token } },
        { upsert: true }
      );
    }
  } catch (error) {
    throw error;
  }
}
