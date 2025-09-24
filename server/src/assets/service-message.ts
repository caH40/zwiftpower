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
    text: `Пользователь ${params.applicantName} подал заявку в вашу команду ${params.teamName}`,
    title: `Заявка в команду ${params.teamName}`,
  }),

  requestApproved: (params) => ({
    text: `Ваша заявка в команду ${params.teamName} одобрена`,
    title: `Вступление в ${params.teamName}`,
  }),

  memberLeft: (params) => ({
    text: `Участник ${params.memberName} вышел из вашей команды ${params.teamName}`,
    title: `Изменения в команде ${params.teamName}`,
  }),

  memberKicked: (params) => ({
    text: `Вы исключили ${params.memberName} из команды ${params.teamName}`,
    title: `Исключение из команды ${params.teamName}`,
  }),

  newMemberJoined: (params) => ({
    text: `В команду ${params.teamName} принят новый участник ${params.memberName}`,
    title: `Новый участник в ${params.teamName}`,
  }),

  requestRejected: (params) => ({
    text: `Ваша заявка в команду ${params.teamName} отклонена`,
    title: `Заявка в ${params.teamName}`,
  }),
};
