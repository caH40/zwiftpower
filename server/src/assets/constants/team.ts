export const teamMessageTemplates: Record<string, string> = {
  team_join_request: 'Пользователь {{applicantName}} подал заявку в вашу команду {{teamName}}',
  team_leave: 'Участник {{memberName}} вышел из вашей команды {{teamName}}',
  team_kicked: 'Вы исключили {{memberName}} из команды {{teamName}}',

  // Для участника
  new_member_joined: 'В команду {{teamName}} принят новый участник {{memberName}}',
  member_left: 'Участник {{memberName}} покинул команду {{teamName}}',

  // Для кандидата
  request_accepted: 'Ваша заявка в команду {{teamName}} одобрена',
  request_rejected: 'Ваша заявка в команду {{teamName}} отклонена',
};

export const SERVICE_MESSAGE_TYPE = ['team', 'race', 'system', 'incoming_message'] as const;
