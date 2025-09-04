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
};
