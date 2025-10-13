import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Достижения и награды команды"
 */
export const HelmetTeamAchievements = ({ teamName, imageUrl, urlSlug }) => {
  const canonical = `${serverFront}/teams/${urlSlug}/achievements`;
  const descriptionRaw = `Достижения и награды команды ${teamName} на Zwiftpower.ru. Посмотрите трофеи, медали и рекорды команды в виртуальных велогонках. 🏆🎖️🚴‍♂️`;
  const titleRaw = `Достижения команды ${teamName} | Награды и трофеи | Zwiftpower.ru`;

  // Запрещены двойные кавычки в мета тегах.
  const description = descriptionRaw.replace(/"/g, '');
  const title = titleRaw.replace(/"/g, '');

  const recommendationsTag = 'teamAchievements';

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
