import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Статистика райдеров по Racing Score"
 */
export const HelmetRacingScore = () => {
  const title = 'Статистика райдеров по Racing Score в Zwift (Звифт)';
  const canonical = `${serverFront}/race/statistics/riders-racing-score`;
  const description =
    'Диаграммы распределения райдеров по Racing Score (Рейтинговые очки). Диаграммы распределения райдеров по категориям (базовые настройки Звифта).';
  const image = 'https://zwiftpower.ru/images/open_graph/4.jpg';
  const recommendationsTag = 'racingScore';

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
