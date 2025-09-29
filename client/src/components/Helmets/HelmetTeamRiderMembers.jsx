import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Состав команды"
 */
export const HelmetTeamRiderMembers = ({ teamName, imageUrl, urlSlug }) => {
  const canonical = `${serverFront}/teams/${urlSlug}/members`;
  const descriptionRaw = `Посмотрите полный состав команды ${teamName} на Zwiftpower.ru. Список всех гонщиков, их категории, активность и статистика выступлений. Найдите своих товарищей! 🚴‍♂️👥`;
  const titleRaw = `Состав команды ${teamName} | Участники и статистика | Zwiftpower.ru`;

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
      <meta property="og:image" content={imageUrl} />
      <meta property="yandex_recommendations_tag" content={recommendationsTag} />
    </Helmet>
  );
};
