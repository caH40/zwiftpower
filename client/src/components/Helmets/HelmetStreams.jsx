import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Трансляции"
 */
export const HelmetStreams = () => {
  const title = 'Трансляции участников Zwift - Смотрите гонки в реальном времени';
  const canonical = `${serverFront}/streams`;
  const description =
    'Смотрите трансляции (стримы) участников Zwift в реальном времени. Следите за гонками, обсуждайте стратегии и будьте в курсе всех событий виртуальных велогонок!';
  const image = 'http://zwiftpower.ru/images/open_graph/stream.jpg';
  const recommendationsTag = 'streams';

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
