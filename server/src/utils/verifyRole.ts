import { validateAccessToken } from '../service/authentication/token.js';

/**
 * Проверка, что пользователь является модератором в любом клубе, организатором или администратором.
 * @param authorization - Строка заголовка Authorization (например, "Bearer <token>")
 * @returns true если пользователь имеет привилегированную роль
 */
export function verifyAdminOrModeratorAccess(authorization: string | undefined): boolean {
  if (!authorization?.startsWith('Bearer ')) {
    return false;
  }

  const accessToken = authorization.split(' ')[1];

  // Дополнительная проверка на пустой токен
  if (!accessToken) {
    return false;
  }

  const tokenData = validateAccessToken(accessToken);

  if (!tokenData) {
    return false;
  }

  const isModeratorClub = !!tokenData.moderator?.clubs?.length;
  const isOrganizer = !!tokenData.organizer;
  const isAdmin = tokenData.role === 'admin';

  return isModeratorClub || isAdmin || isOrganizer;
}
