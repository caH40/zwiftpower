import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Формирование Мета тегов для страницы "Статистика"
 */
export const HelmetStatisticsMain = () => {
  const title = 'Статистика по райдерам и Эвентам в Zwift (Звифт)';
  const canonical = `${serverFront}/race/statistics/main`;
  const description =
    'Общая статистика российского сообщества в Zwift (Звифт). Диаграммы по количеству участников в гонках, по возрастным категориям, по типам заездов.';
  const image = 'https://zwiftpower.ru/images/open_graph/5.jpg';
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
