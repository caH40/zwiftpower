import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Профиль пользователя"
 */
export const HelmetProfile = ({ profileId, firstName, lastName, image, page }) => {
  const rider = `${firstName} ${lastName}`;

  const canonical = `${serverFront}/${profileId}/${page}`;

  // Формирование описания. По умолчанию описание главной страницы профиля с результатами заездов.
  let descriptionRaw = `Профиль райдера ${rider}. Результаты заездов в Zwift (Звифт).`;

  let titleRaw = `Результаты заездов ${rider}`;

  switch (page) {
    case 'power':
      descriptionRaw = `Кривая мощности за 90 дней ${rider} в Zwift (Звифт). Сравнение кривых мощности за разные заезды.`;

      titleRaw = `Диаграмма мощности ${rider}`;
      break;

    case 'racing-score':
      descriptionRaw = `Диаграмма изменения гоночного рейтинга (Racing Score) райдера ${rider} в Zwift (Звифт).`;

      titleRaw = `Диаграмма изменения Racing Score для райдера ${rider}`;
      break;
  }

  // Запрещены двойные кавычки в мета тегах.
  const description = descriptionRaw.replace(/"/g, '');
  const title = titleRaw.replace(/"/g, '');

  const recommendationsTag = 'profile';

  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={canonical} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="yandex_recommendations_tag" content={recommendationsTag} />
    </Helmet>
  );
};
