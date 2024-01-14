import { Helmet } from 'react-helmet-async';

import { serverFront } from '../../config/environment';

/**
 * Для страницы Статистика количество райдеров в Эвентах
 */
export const HelmetStatisticsMain = () => {
  return (
    <Helmet>
      <link rel="canonical" href={`${serverFront}/race/statistics/main`} />
      <title>Статистика по райдерам и Эвентам в Zwift (Звифт)</title>
      <meta
        name="description"
        content="Общая статистика российского сообщества в Zwift (Звифт). 
        Диаграммы по количеству участников в гонках, по возрастным категориям, по типам заездов."
      />
      <meta property="og:title" content="Статистика по райдерам и Эвентам в Zwift (Звифт)" />
      <meta property="og:url" content={`${serverFront}/race/statistics/main`} />
      <meta
        property="og:description"
        content="Общая статистика российского сообщества в Zwift (Звифт). 
        Диаграммы по количеству участников в гонках, по возрастным категориям, по типам заездов."
      />
      <meta property="og:image" content="https://zwiftpower.ru/images/open_graph/5.jpg" />
    </Helmet>
  );
};
