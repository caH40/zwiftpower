import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Статистика райдеров по FTP"
 */
export const HelmetFTP = () => {
  const title = 'Статистика райдеров по FTP в Zwift (Звифт)';
  const canonical = `${serverFront}/race/statistics/riders-ftp`;
  const description =
    'Диаграммы распределения райдеров по FTP (Functional Threshold Power). Диаграммы распределения райдеров по категориям (группам).';
  const image = 'https://zwiftpower.ru/images/open_graph/3.jpg';
  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={canonical} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
};
