/**
 * Данные метатегов для статических страниц.
 * FIXME: Сделать синхронизацию с метатегами на сервере при серверной генерации метатегов страниц.
 */
export const helmetProps = {
  OFFER: {
    title: 'Публичная оферта на платные услуги ZwiftPower.ru – условия и стоимость',
    canonical: '/legal/offer',
    description:
      'Подробная информация о публичной оферте ZwiftPower.ru: условия предоставления платных услуг, стоимость и порядок оформления. Ознакомьтесь с условиями перед покупкой.',
    image: '/images/open_graph/legal.png',
    noindex: true,
  },

  PRIVATE_POLICE: {
    title: 'Политика конфиденциальности ZwiftPower.ru – защита данных пользователей',
    canonical: '/legal/privacy-policy',
    description:
      'Ознакомьтесь с политикой конфиденциальности ZwiftPower.ru: как мы собираем, обрабатываем и защищаем ваши персональные данные при использовании сайта и сервисов.',
    image: '/images/open_graph/legal.png',
    noindex: true,
  },

  TERMS_OF_USE: {
    title: 'Пользовательское соглашение ZwiftPower.ru – правила использования сайта',
    canonical: '/legal/terms-of-use',
    description:
      'Полное пользовательское соглашение ZwiftPower.ru: правила использования сайта, ограничения ответственности и условия пользования всеми сервисами платформы.',
    image: '/images/open_graph/legal.png',
    noindex: true,
  },

  ORGANIZERS_PUBLIC: {
    title: 'Организаторы гонок Zwift – Серии заездов, Туры, Коферайды',
    canonical: '/organizers',
    description:
      'Найдите организаторов гонок Zwift! Индивидуальные и командные заезды, серии, туры, TT и коферайды. Выбирайте события и участвуйте в виртуальных заездах! 🚴‍♂️🔥',
    image: '/images/open_graph/organizers.webp',
    noindex: true,
  },

  TEAMS_PUBLIC: {
    title: 'Велосипедные команды Zwift – Составы, Участники, Результаты',
    canonical: '/teams',
    description:
      'Откройте для себя велосипедные команды в Zwift! Составы участников, результаты гонок и рейтинги. Присоединяйтесь к командам и участвуйте в виртуальных заездах вместе! 🚴‍♀️🚴‍♂️🔥',
    image: '/images/open_graph/teams.png',
    noindex: true,
  },

  TEAM_CREATE: {
    title: 'Создать команду на сайте Zwiftpower.ru – Организация и управление',
    canonical: '/moderation/teams/create',
    description:
      'Создайте собственную велосипедную команду на сайте Zwiftpower.ru! Добавляйте участников, настраивайте профиль команды и участвуйте в гонках, турах и сериях под своим флагом. 🚴‍♂️🚴‍♀️💨',
    image: '/images/open_graph/teams.webp',
    noindex: true,
  },

  DOCUMENTATION: {
    title: 'Документация и руководства | Zwiftpower.ru – Вся официальная информация',
    canonical: '/documentation',
    description:
      'Полная документация по Zwiftpower.ru: руководство для пользователей, FAQ, гайды для организаторов событий и материалы для разработчиков. Найдите ответы на все ваши вопросы!',
    image: '/images/open_graph/documentation.jpg',
    noindex: false,
  },

  USER_DOCS: {
    title: 'Руководство пользователя Zwiftpower.ru | Полная инструкция по сайту',
    canonical: '/docs/user',
    description:
      'Подробное руководство пользователя по Zwiftpower.ru. Как связать аккаунты, анализировать гонки, понять рейтинг ZP и использовать все возможности платформы для улучшения своих результатов. 🚴‍♂️📊',
    image: '/images/open_graph/documentation.jpg',
    noindex: false,
  },

  ORGANIZER_DOCS: {
    title: 'Руководство организатора Zwiftpower | Создание заездов, серий и туров',
    canonical: '/docs/organizer',
    description:
      'Полное руководство по организации мероприятий в Zwift. Как создать одиночный заезд, многодневный тур или серию гонок: настройка этапов, общих правил, категорий и автоматического подсчета очков. 🏁🗓️',
    image: '/images/open_graph/documentation.jpg',
    noindex: false,
  },

  DEVELOPER_DOCS: {
    title: 'API и документация для разработчиков | Zwiftpower Developer Portal',
    canonical: '/docs/developer',
    description:
      'Техническая документация и API для интеграции с Zwiftpower. Получите доступ к данным гонок, профилей гонщиков и результатов. Руководство по аутентификации, примерам запросов и форматам данных (JSON). 🚴‍♂️💻',
    image: '/images/open_graph/documentation.jpg',
    noindex: false,
  },

  TEAM_CONTROL: {
    title: 'Управление командой | Настройки, участники и модерация | Zwiftpower.ru',
    canonical: '/team/manage',
    description:
      'Панель управления вашей велокомандой на Zwiftpower.ru. Редактирование профиля, приглашение и удаление участников, настройки приватности, модерация заявок и управление правами доступа. 🚴‍♂️⚙️',
    image: '/images/open_graph/team-management.webp',
    noindex: true,
  },
};
