/**
 * Данные метатегов для статических страниц.
 * FIXME: Сделать синхронизацию с метатегами на сервере при серверной генерации метатегов страниц.
 */
export const LEGAL_HELMET_PROPS = {
  OFFER: {
    title: 'Публичная оферта на платные услуги ZwiftPower.ru – условия и стоимость',
    canonical: '/legal/offer',
    description:
      'Подробная информация о публичной оферте ZwiftPower.ru: условия предоставления платных услуг, стоимость и порядок оформления. Ознакомьтесь с условиями перед покупкой.',
    image: '/images/open_graph/legal.png',
    imageAlt: 'Документ публичной оферты ZwiftPower.ru - условия платных услуг',
    noindex: true,
  },

  PRIVATE_POLICE: {
    title: 'Политика конфиденциальности ZwiftPower.ru – защита данных пользователей',
    canonical: '/legal/privacy-policy',
    description:
      'Ознакомьтесь с политикой конфиденциальности ZwiftPower.ru: как мы собираем, обрабатываем и защищаем ваши персональные данные при использовании сайта и сервисов.',
    image: '/images/open_graph/legal.png',
    imageAlt: 'Политика конфиденциальности ZwiftPower.ru - защита персональных данных',
    noindex: true,
  },

  TERMS_OF_USE: {
    title: 'Пользовательское соглашение ZwiftPower.ru – правила использования сайта',
    canonical: '/legal/terms-of-use',
    description:
      'Полное пользовательское соглашение ZwiftPower.ru: правила использования сайта, ограничения ответственности и условия пользования всеми сервисами платформы.',
    image: '/images/open_graph/legal.png',
    imageAlt: 'Пользовательское соглашение ZwiftPower.ru - правила использования сайта',
    noindex: true,
  },
};

export const TEAM_HELMET_PROPS = {
  TEAMS_PUBLIC: {
    title: 'Велосипедные команды Zwift – Составы, Участники, Результаты',
    canonical: '/teams',
    description:
      'Откройте для себя велосипедные команды в Zwift! Составы участников, результаты гонок и рейтинги. Присоединяйтесь к командам и участвуйте в виртуальных заездах вместе! 🚴‍♀️🚴‍♂️🔥',
    image: '/images/open_graph/teams.png',
    imageAlt: 'Список велокоманд Zwift - составы, участники и результаты',
    noindex: false,
  },

  TEAM_CREATE: {
    title: 'Создать команду на сайте Zwiftpower.ru – Организация и управление',
    canonical: '/moderation/teams/create',
    description:
      'Создайте собственную велосипедную команду на сайте Zwiftpower.ru! Добавляйте участников, настраивайте профиль команды и участвуйте в гонках, турах и сериях под своим флагом. 🚴‍♂️🚴‍♀️💨',
    image: '/images/open_graph/teams.webp',
    imageAlt: 'Создание новой команды в Zwift - интерфейс регистрации',
    noindex: true,
  },

  TEAM_CONTROL: {
    title: 'Управление командой | Настройки, участники и модерация | Zwiftpower.ru',
    canonical: '/team/manage',
    description:
      'Панель управления вашей велокомандой на Zwiftpower.ru. Редактирование профиля, приглашение и удаление участников, настройки приватности, модерация заявок и управление правами доступа. 🚴‍♂️⚙️',
    image: '/images/open_graph/team-management.webp',
    imageAlt: 'Управление командой Zwift - настройки, участники и модерация',
    noindex: true,
  },
};

export const DOCUMENTATION_HELMET_PROPS = {
  DOCUMENTATION: {
    title: 'Документация и руководства | Zwiftpower.ru – Вся официальная информация',
    canonical: '/documentation',
    description:
      'Полная документация по Zwiftpower.ru: руководство для пользователей, FAQ, гайды для организаторов событий и материалы для разработчиков. Найдите ответы на все ваши вопросы!',
    image: '/images/open_graph/documentation.jpg',
    imageAlt: 'Документация ZwiftPower.ru - руководства для пользователей',
    noindex: false,
  },

  USER_DOCS: {
    title: 'Руководство пользователя Zwiftpower.ru | Полная инструкция по сайту',
    canonical: '/docs/user',
    description:
      'Подробное руководство пользователя по Zwiftpower.ru. Как связать аккаунты, анализировать гонки, понять рейтинг ZP и использовать все возможности платформы для улучшения своих результатов. 🚴‍♂️📊',
    image: '/images/open_graph/documentation.jpg',
    imageAlt: 'Руководство пользователя ZwiftPower - инструкции по работе с сайтом',
    noindex: false,
  },

  ORGANIZER_DOCS: {
    title: 'Руководство организатора Zwiftpower | Создание заездов, серий и туров',
    canonical: '/docs/organizer',
    description:
      'Полное руководство по организации мероприятий в Zwift. Как создать одиночный заезд, многодневный тур или серию гонок: настройка этапов, общих правил, категорий и автоматического подсчета очков. 🏁🗓️',
    image: '/images/open_graph/documentation.jpg',
    imageAlt: 'Руководство организатора Zwift - создание заездов и мероприятий',
    noindex: false,
  },

  DEVELOPER_DOCS: {
    title: 'API и документация для разработчиков | Zwiftpower Developer Portal',
    canonical: '/docs/developer',
    description:
      'Техническая документация и API для интеграции с Zwiftpower. Получите доступ к данным гонок, профилей гонщиков и результатов. Руководство по аутентификации, примерам запросов и форматам данных (JSON). 🚴‍♂️💻',
    image: '/images/open_graph/documentation.jpg',
    imageAlt: 'API документация ZwiftPower - разработка и интеграция',
    noindex: false,
  },
};

export const ORGANIZERS_HELMET_PROPS = {
  ORGANIZERS_PUBLIC: {
    title: 'Организаторы гонок Zwift – Серии заездов, Туры, Коферайды',
    canonical: '/organizers',
    description:
      'Найдите организаторов гонок Zwift! Индивидуальные и командные заезды, серии, туры, TT и коферайды. Выбирайте события и участвуйте в виртуальных заездах! 🚴‍♂️🔥',
    image: '/images/open_graph/organizers.webp',
    imageAlt: 'Организаторы гонок Zwift - серии заездов и туры',
    noindex: true,
  },
};

export const MAIN_HELMET_PROPS = {
  MAIN: {
    title: 'Анонсы ближайших заездов в Zwift (Звифт) российского сообщества',
    canonical: '/',
    description: 'Анонсы ближайших заездов в виртуальном мире Zwift (Звифт) на велотренажерах.',
    image: '/images/open_graph/main.png',
    imageAlt: 'Главная страница ZwiftPower - анонсы ближайших заездов',
    noindex: false,
  },
};

export const STATISTICS_HELMET_PROPS = {
  MAIN: {
    title: 'Статистика по райдерам и Эвентам в Zwift (Звифт)',
    canonical: '/race/statistics/main',
    description:
      'Общая статистика российского сообщества в Zwift (Звифт). Диаграммы по количеству участников в гонках, по возрастным категориям, по типам заездов.',
    image: '/images/open_graph/statistics.png',
    imageAlt: 'Общая статистика сообщества Zwift - диаграммы участников',
    noindex: false,
  },

  FTP: {
    title: 'Статистика райдеров по FTP в Zwift (Звифт)',
    canonical: '/race/statistics/riders-ftp',
    description:
      'Диаграммы распределения райдеров по FTP (Functional Threshold Power). Диаграммы распределения райдеров по категориям (группам).',
    image: '/images/open_graph/statistics3.png',
    imageAlt: 'Статистика FTP райдеров Zwift - распределение по мощности',
    noindex: false,
  },

  RACING_SCORE: {
    title: 'Статистика райдеров по Racing Score в Zwift (Звифт)',
    canonical: '/race/statistics/riders-racing-score',
    description:
      'Диаграммы распределения райдеров по Racing Score (Рейтинговые очки). Диаграммы распределения райдеров по категориям (базовые настройки Звифта).',
    image: '/images/open_graph/statistics2.png',
    imageAlt: 'Статистика Racing Score - рейтинговые очки гонщиков',
    noindex: false,
  },
};

export const SCHEDULE_HELMET_PROPS = {
  title: 'Расписание заездов в Zwift (Звифт) российского сообщества',
  canonical: '/race/schedule',
  description:
    'Расписание групповых заездов, соревнований в виртуальном мире Zwift (Звифт) на велотренажерах.',
  image: '/images/open_graph/schedule.png',
  noindex: false,
  imageAlt: 'Расписание заездов Zwift - календарь мероприятий',
};

export const RESULTS_LIST_HELMET_PROPS = {
  title: 'Результаты заездов российского сообщества в Zwift (Звифт)',
  canonical: '/race/results',
  description:
    'Результаты групповых заездов, соревнований в виртуальном мире Zwift (Звифт) на велотренажерах.',
  image: '/images/open_graph/results-list.png',
  noindex: false,
  imageAlt: 'Результаты заездов Zwift - итоги соревнований',
};

export const RIDERS_LIST_HELMET_PROPS = {
  title: 'Участники заездов Zwift | Поиск по списку гонщиков на ZwiftPower.ru',
  canonical: 'https://zwiftpower.ru/race/results',
  description:
    '🔍 Полный список всех райдеров и участников заездов в Zwift. Найдите гонщика, посмотрите его результаты, статистику и рейтинг на ZwiftPower.ru. Анализируйте своих соперников!',
  image: '/images/open_graph/riders.png',
  imageAlt: 'Список участников заездов в Zwift на ZwiftPower',
  noindex: false,
};

export const SERVICES_HELMET_PROPS = {
  SERVICES: {
    title: 'Платные услуги и подписки | Организатор заездов ZwiftPower.ru',
    canonical: '/site-services',
    description:
      'Тарифы на услуги организатора заездов в Zwift. Создание серий, туров с полной интеграцией. Расширенные настройки: категории, маршруты, лимиты мощности.',
    image: '/images/open_graph/price.png',
    imageAlt: 'Платные услуги ZwiftPower - тарифы для организаторов заездов',
    noindex: false,
  },
};
