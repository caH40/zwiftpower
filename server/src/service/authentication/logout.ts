import { errorHandler } from '../../errors/error.js';
import { removeToken } from './token.js';

export async function logoutService(refreshToken: string) {
  try {
    await removeToken(refreshToken);
    return { message: 'Вы вышли из сервиса!' };
  } catch (error) {
    errorHandler(error);
    throw error;
  }
}
