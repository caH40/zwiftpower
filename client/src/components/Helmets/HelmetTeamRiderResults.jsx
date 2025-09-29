import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Результаты участников команды"
 */
export const HelmetTeamRiderResults = ({ teamName, imageUrl, urlSlug }) => {
  const canonical = `${serverFront}/teams/${urlSlug}/results`;
  const descriptionRaw = `История выступлений и результаты команды ${teamName} на Zwiftpower.ru. Итоги последних гонок, серий и туров, очки команды (ZP points) и позиция в рейтинге. 🏆📈`;
  const titleRaw = `Результаты команды ${teamName} | История выступлений в заездах | Zwiftpower.ru`;

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
