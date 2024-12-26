import { handleAndLogError } from '../../errors/error.js';
import { removeToken } from './token.js';

/**
 * Сервис выхода из авторизованного состояния на сайте.
 */
export async function logoutService(refreshToken: string) {
  try {
    // Удаление документа токена аутентификации из БД.
    await removeToken(refreshToken);

    return { message: 'Вы вышли из сервиса!' };
  } catch (error) {
    handleAndLogError(error);
    throw error;
  }
}
