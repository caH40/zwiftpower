/**
 * Системные сервисные сообщения. Изменения в системе.
 */
export const systemMessageTemplates = {
  newTeamCreated: (params: { creatorName: string; teamName: string }) => ({
    text: `Пользователь ${params.creatorName} создал новую команду: "${params.teamName}"`,
    title: 'Создание команды',
  }),

  youWereCreatedNewTeam: (params: { teamName: string }) => ({
    text: `Вы успешно создали команду "${params.teamName}"`,
    title: 'Команда создана',
  }),
};
