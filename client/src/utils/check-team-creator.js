/**
 * Проверяет, разрешено ли показывать сущность пользователю.
 *
 * Условие: пользователь должен быть авторизован,
 * состоять в команде с указанным `teamIdForPermission`
 * и являться её создателем.
 *
 * @param {Object} params - Параметры проверки.
 * @param {boolean} params.status - Статус авторизации пользователя.
 * @param {string} params.teamIdForPermission - ID команды, для которой требуется доступ.
 * @param {{ id: string, isCreator: boolean } | undefined} params.userInTeam - Информация о команде пользователя.
 * @returns {boolean} true, если пользователь авторизован и является создателем команды, иначе false.
 */
export function allowForTeamCreator({ status, teamIdForPermission, userInTeam }) {
  return status && userInTeam && teamIdForPermission === userInTeam.id && userInTeam.isCreator;
}
