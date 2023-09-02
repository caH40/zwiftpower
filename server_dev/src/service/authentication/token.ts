import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Token } from '../../Model/Token.js';
import { jwtAccessSecret, jwtRefreshSecret } from '../../config/environment.js';

import { GenerateToken } from '../../types/auth.interface.js';
import { Types } from 'mongoose';

export async function generateToken(payload: GenerateToken) {
  try {
    const accessToken = jwt.sign(payload, jwtAccessSecret, { expiresIn: '1d' });
    const refreshToken = jwt.sign(payload, jwtRefreshSecret, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
}

export async function saveToken(userId: Types.ObjectId, refreshToken: string) {
  try {
    const tokenDB = await Token.findOne({ user: userId });
    if (tokenDB) {
      tokenDB.refreshToken = refreshToken;
      return await tokenDB.save(); //вернётся ли тут сохранённое значение??
    }

    const newTokenDB = await Token.create({ user: userId, refreshToken });
    return newTokenDB;
  } catch (error) {
    console.log(error);
  }
}

export async function removeToken(refreshToken: string) {
  try {
    const tokenDB = await Token.findOneAndDelete({ refreshToken });
    return tokenDB;
  } catch (error) {
    console.log(error);
  }
}

export function validateAccessToken(token: string) {
  try {
    const userData = jwt.verify(token, jwtAccessSecret);
    return userData;
  } catch (error) {
    return;
  }
}

export function validateRefreshToken(token: string) {
  try {
    const userData = jwt.verify(token, jwtRefreshSecret);
    if (typeof userData !== 'string') {
      return userData;
    }
  } catch (error) {
    return;
  }
}
