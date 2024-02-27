import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Участники заездов (поиск райдеров)"
 */
export const HelmetRiders = () => {
  const title = 'Участники заездов в Zwift';
  const canonical = `${serverFront}/riders`;
  const description =
    'Поиск райдеров, которые участвовали в гонках Звифт, опубликованных на сайте zwiftpower.ru';
  const image = 'https://zwiftpower.ru/images/open_graph/11.jpg';
  const recommendationsTag = 'riders';

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
