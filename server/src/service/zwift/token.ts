import axios from 'axios';
import qs from 'qs';
import { Types } from 'mongoose';

import { ZwiftToken } from '../../Model/ZwiftToken.js';
import {
  passwordZwift,
  // passwordZwiftSecondary,
  secureUrl,
  usernameZwift,
  // usernameZwiftSecondary,
} from '../../config/environment.js';
import { errorHandler } from '../../errors/error.js';
import { Club } from '../../Model/Club.js';
import { Organizer } from '../../Model/Organizer.js';

const zwiftUsers = [
  {
    username: usernameZwift,
    password: passwordZwift,
    importance: 'main',
  },
  // {
  //   username: usernameZwiftSecondary,
  //   password: passwordZwiftSecondary,
  //   importance: 'secondary',
  // },
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
 * Получение токена доступа к API Zwift для Организатора по ID клуба, принадлежащего организатору..
 */
export async function getAccessTokenOrganizer({
  clubId,
  importanceToken,
}: {
  clubId: string;
  importanceToken: 'main' | 'secondary';
}) {
  // Для получения токена-доступа к zwiftAPI запрашиваем клуб в котором создается Эвент, а затем получем id организатора.
  const clubDB = await Club.findOne({ id: clubId }, { _id: false, organizer: true }).lean<{
    organizer: Types.ObjectId;
  }>();

  if (!clubDB) {
    throw new Error('Не найден клуб в БД в котором создается Эвент!');
  }

  const tokenDB = await ZwiftToken.findOne(
    { organizer: clubDB.organizer, importance: importanceToken },
    { token: true, iv: true, _id: false }
  ).lean<{
    token: string;
  }>();

  if (!tokenDB) {
    throw new Error('Не найдет token доступа для бота-модератора клубов в Zwift!');
  }

  return tokenDB.token;
}

type ParamsGetTokenForEvent = {
  organizerLabel: string;
  organizerId?: Types.ObjectId;
};
/**
 * Получение токена доступа к ZwiftAPI для работы с данными Эвента по organizerLabel, или
  organizerId.
 * organizerId добавился когда уже были Эвенты в которых сохранялся только label.
 */
export async function getTokenForEvent({
  organizerLabel,
  organizerId,
}: ParamsGetTokenForEvent): Promise<string> {
  let query = {} as Record<string, Types.ObjectId>;

  if (organizerId) {
    query = { organizer: organizerId };
  } else {
    const organizerDB = await Organizer.findOne({ label: organizerLabel }, { _id: true }).lean<{
      _id: Types.ObjectId;
    }>();

    if (!organizerDB) {
      throw new Error(`Organizer с label "${organizerLabel}" не найден.`);
    }

    query = { organizer: organizerDB._id };
  }

  const tokenDB = await ZwiftToken.findOne(query, { _id: false, token: true, iv: true }).lean<{
    token: string | null;
  }>();

  if (!tokenDB?.token) {
    throw new Error('Не найдет token доступа для бота-модератора клубов в Zwift!');
  }

  return tokenDB.token;
}

/**
 * Создание общего токена доступа к Звифт и сохранение в БД.
 * !!! Заменить дублируемый код генерации токена на функцию generateAccessTokenZwift.
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
    errorHandler(error);
  }
}

/**
 * Получение токена доступа к Звифт.
 */
export async function generateAccessTokenZwift({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string | undefined> {
  try {
    const data = {
      client_id: 'Zwift_Mobile_Link',
      username: email,
      password,
      grant_type: 'password',
    };

    const response = await axios.post(secureUrl, qs.stringify(data));

    if (!response.data.access_token) {
      throw new Error('Не получен токен с ZwiftAPI!');
    }

    return response.data.access_token;
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error)) {
        const description = error.response?.data?.error_description;
        throw new Error(description ? description : error.message);
      }
      throw new Error('Неизвестная ошибка в модуле generateAccessTokenZwift()');
    }
  }
}
