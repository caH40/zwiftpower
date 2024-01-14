import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Для страницы Страница распределения райдеров по FTP
 */
export const HelmetFTP = () => {
  return (
    <Helmet>
      <link rel="canonical" href={`${serverFront}/race/statistics/riders-ftp`} />
      <title>"Статистика райдеров по FTP в Zwift (Звифт)"</title>
      <meta
        name="description"
        content="Диаграммы распределения райдеров по FTP (Functional Threshold Power). 
        Диаграммы распределения райдеров по категориям (группам)."
      />
      <meta property="og:title" content="Статистика райдеров по FTP в Zwift (Звифт)" />
      <meta property="og:url" content={`${serverFront}/race/statistics/riders-ftp`} />
      <meta
        property="og:description"
        content="Диаграммы распределения райдеров по FTP (Functional Threshold Power). 
        Диаграммы распределения райдеров по категориям (группам)."
      />
      <meta property="og:image" content="https://zwiftpower.ru/images/open_graph/3.jpg" />
    </Helmet>
  );
};
