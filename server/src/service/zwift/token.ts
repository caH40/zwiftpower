import axios from 'axios';
import qs from 'qs';

import { ZwiftToken } from '../../Model/ZwiftToken.js';
import {
  passwordZwift,
  passwordZwiftSecondary,
  secureUrl,
  usernameZwift,
  usernameZwiftSecondary,
} from '../../config/environment.js';

const zwiftUsers = [
  {
    username: usernameZwift,
    password: passwordZwift,
    importance: 'main',
  },
  {
    username: usernameZwiftSecondary,
    password: passwordZwiftSecondary,
    importance: 'secondary',
  },
];

/**
 * Получение токена доступа к API Zwift с логином username
 */
export async function getAccessToken(isMainToken?: boolean) {
  const importance = isMainToken ? 'main' : 'secondary';
  const username = isMainToken ? zwiftUsers[0].username : zwiftUsers[1].username;

  const tokenDB = await ZwiftToken.findOne({ username, importance });

  if (!tokenDB) {
    throw new Error('Токен не найден!');
  }

  return tokenDB.token;
}

/**
 * Создание общего токена доступа к Звифт и сохранение в БД
 */
export async function updateAccessToken() {
  try {
    for (const user of zwiftUsers) {
      const data = {
        client_id: 'Zwift_Mobile_Link',
        username: user.username,
        password: user.password,
        grant_type: 'password',
      };

      const response = await axios.post(secureUrl, qs.stringify(data));
      const token = response.data.access_token;

      await ZwiftToken.findOneAndUpdate(
        { username: user.username, importance: user.importance },
        { $set: { token } },
        { upsert: true }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
