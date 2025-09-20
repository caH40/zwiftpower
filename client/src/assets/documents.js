export const documentChapters = [
  {
    type: 'public',
    label: 'Справочник пользователя',
    icon: '👤',
    description: 'Руководство по использованию платформы для участников заездов',
    permissions: ['all'],
  },
  {
    type: 'faq',
    label: 'Часто задаваемые вопросы',
    icon: '❓',
    description: 'Ответы на популярные вопросы пользователей',
    permissions: ['all'],
  },
  {
    type: 'organizer',
    label: 'Документация организатора',
    icon: '🎯',
    description: 'Инструкции по созданию и управлению событиями',
    permissions: ['admin', 'organizer'],
  },
  {
    type: 'development',
    label: 'Документация разработчика',
    icon: '💻',
    description: 'Техническая документация API и архитектуры системы',
    permissions: ['admin'],
  },
  // {
  //   type: 'api',
  //   label: 'API Reference',
  //   icon: '🔌',
  //   description: 'Полное описание REST API endpoints и параметров',
  //  permissions: ['all'],
  // },
  // {
  //   type: 'tutorials',
  //   label: 'Обучающие материалы',
  //   icon: '🎓',
  //   description: 'Пошаговые руководства и видео-туториалы',
  //  permissions: ['all'],
  // },
];
