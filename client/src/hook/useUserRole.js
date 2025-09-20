import { useSelector } from 'react-redux';

/**
 * Хук для определения роли текущего пользователя.
 *
 * Проверяет, авторизован ли пользователь, является ли он администратором,
 * организатором, модератором клуба или создателем указанной команды.
 *
 * @param {Object} [params] - Параметры проверки.
 *
 * @returns {{
 *   hasAuth: boolean;                // Авторизован ли пользователь
 *   isAdmin: boolean;                // Роль администратора
 *   isOrganizer: boolean;            // Роль организатора
 *   isCurrentTeamCreator: boolean;   // Создатель указанной команды
 *   isClubModerator: boolean;        // Модератор хотя бы одного клуба
 * }}
 */
export function useUserRole() {
  const { status, user } = useSelector((state) => state.checkAuth.value);

  const isOrganizer = Boolean(user?.organizer);
  const isAdmin = user?.role === 'admin';
  const isClubModerator = user.isModeratorClub;

  return {
    hasAuth: status,
    isAdmin,
    isOrganizer,
    isClubModerator,
  };
}
