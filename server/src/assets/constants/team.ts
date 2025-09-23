import { TServiceMessageType } from '../../types/types.interface';

export const serviceMessageTemplates: Record<TServiceMessageType, Record<string, string>> = {
  team: {
    team_join_request:
      'Пользователь {{applicantName}} подал заявку в вашу команду {{teamName}}',
    team_leave: 'Участник {{memberName}} вышел из вашей команды {{teamName}}',
    team_kicked: 'Вы исключили {{memberName}} из команды {{teamName}}',

    // Для участника
    new_member_joined: 'В команду {{teamName}} принят новый участник {{memberName}}',
    member_left: 'Участник {{memberName}} покинул команду {{teamName}}',

    // Для кандидата
    request_accepted: 'Ваша заявка в команду {{teamName}} одобрена',
    request_rejected: 'Ваша заявка в команду {{teamName}} отклонена',
  },
  race: {},
  system: {},
  incoming_message: {},
};

export const MESSAGE_TEMPLATE_METADATA_KEYS = [
  'applicantName',
  'teamName',
  'memberName',
] as const;

export const serviceTypes: Record<TServiceMessageType, string> = {
  team: 'Команда',
  race: 'Заезды',
  system: 'Система',
  incoming_message: 'Входящее сообщение',
};

export const SERVICE_MESSAGE_TYPE = ['team', 'race', 'system', 'incoming_message'] as const;
