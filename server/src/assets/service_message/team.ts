export const teamMessageTemplates = {
  joinRequest: (params: { applicantName: string; teamName: string }) => ({
    text: `Пользователь ${params.applicantName} подал заявку в вашу команду "${params.teamName}"`,
    title: 'Заявка в команду',
  }),

  requestApproved: (params: { teamName: string }) => ({
    text: `Ваша заявка в команду "${params.teamName}" одобрена`,
    title: 'Вступление в команду',
  }),

  requestRejected: (params: { teamName: string }) => ({
    text: `Ваша заявка в команду "${params.teamName}" отклонена`,
    title: 'Отклонение заявки',
  }),

  memberLeft: (params: { memberName: string; teamName: string }) => ({
    text: `Участник ${params.memberName} вышел из вашей команды "${params.teamName}"`,
    title: 'Изменения в команде',
  }),

  youKickedMember: (params: { memberName: string; teamName: string }) => ({
    text: `Вы исключили ${params.memberName} из команды "${params.teamName}"`,
    title: 'Исключение из команды',
  }),

  youWereKicked: (params: { teamName: string }) => ({
    text: `Вы были исключены из команды "${params.teamName}"`,
    title: `Исключение из команды`,
  }),

  newMemberJoined: (params: { memberName: string; teamName: string }) => ({
    text: `В команду "${params.teamName}" принят новый участник ${params.memberName}`,
    title: 'Новый участник',
  }),

  // ban
  youBannedMember: (params: { memberName: string; teamName: string }) => ({
    text: `Вы заблокировали ${params.memberName} в команде "${params.teamName}"`,
    title: 'Блокировка участника',
  }),

  youWereBanned: (params: { teamName: string }) => ({
    text: `Вы были заблокированы в команде "${params.teamName}"`,
    title: 'Блокировка в команде',
  }),
};
