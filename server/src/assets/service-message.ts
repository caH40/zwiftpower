import {
  TeamMessageParams,
  TeamMessageResult,
  TeamMessageType,
} from '../types/service-message.types';

export const SERVICE_MESSAGE_TYPE = ['team', 'race', 'system', 'incoming_message'] as const;

export const teamMessageTemplates: {
  [K in TeamMessageType]: (params: TeamMessageParams[K]) => TeamMessageResult;
} = {
  joinRequest: (params) => ({
    text: `Пользователь ${params.applicantName} подал заявку в вашу команду "${params.teamName}"`,
    title: 'Заявка в команду',
  }),

  requestApproved: (params) => ({
    text: `Ваша заявка в команду "${params.teamName}" одобрена`,
    title: 'Вступление в команду',
  }),

  requestRejected: (params) => ({
    text: `Ваша заявка в команду "${params.teamName}" отклонена`,
    title: 'Отклонение заявки',
  }),

  memberLeft: (params) => ({
    text: `Участник ${params.memberName} вышел из вашей команды "${params.teamName}"`,
    title: 'Изменения в команде',
  }),

  youKickedMember: (params) => ({
    text: `Вы исключили ${params.memberName} из команды "${params.teamName}"`,
    title: 'Исключение из команды',
  }),

  youWereKicked: (params: { teamName: string }) => ({
    text: `Вы были исключены из команды "${params.teamName}"`,
    title: `Исключение из команды`,
  }),

  newMemberJoined: (params) => ({
    text: `В команду "${params.teamName}" принят новый участник ${params.memberName}`,
    title: 'Новый участник',
  }),
};
